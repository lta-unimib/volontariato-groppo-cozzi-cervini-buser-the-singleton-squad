package com.unimib.singletonsquad.doit.service.feedback;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.StatisticVolunteer;
import com.unimib.singletonsquad.doit.domain.organization.FeedbackOrganization;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.FeedbackVolunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.mappers.FeedbackMapper;
import com.unimib.singletonsquad.doit.service.statistic.StatisticOrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final VolunteerOfferDatabaseService volunteerOfferDatabaseService;
    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;
    private final VolunteerDatabaseService volunteerDatabaseService;
    private final StatisticOrganizationService statisticOrganizationService;

    /// Organizzazione che vota il volontario per una determinata richiesta
    @Transactional
    public void setOrganizationVoteOffer(Organization organization, Long requestId, String volunteerEmail, double vote) throws IllegalAccessException {
        VolunteerOffer offer = findAndValidateVolunteerOffer(organization, requestId, volunteerEmail);

        Volunteer volunteer = offer.getVolunteer();
        VolunteerRequest request = volunteerRequestDatabaseService.getSpecificRequest(offer.getVolunteerRequest().getId());

        updateOfferWithOrganizationFeedback(offer, vote);

        volunteerRequestDatabaseService.save(request);
        updateVolunteerStatistics(volunteer, vote);
    }

    /// Il volontario che vota una richiesta di un'organizzazione
    @Transactional
    public void setVolunteerVoteRequest(Volunteer volunteer, Long requestId, double vote) throws IllegalAccessException {
        VolunteerRequest request = volunteerRequestDatabaseService.getSpecificRequest(requestId);
        VolunteerOffer offer = volunteerOfferDatabaseService.getVolunteerOfferByRequestId(requestId, volunteer.getEmail());
        updateOfferWithVolunteerFeedback(offer, volunteer, vote, request);
    }

    /// === SUPPORT METHOD ====
    private VolunteerOffer findAndValidateVolunteerOffer(Organization organization, Long requestId, String volunteerEmail) throws IllegalAccessException {
        VolunteerOffer offer = volunteerOfferDatabaseService.getVolunteerOfferByRequestId1(requestId, volunteerEmail, organization);
        if (offer.isVotedByOrganization()) {
            throw new IllegalAccessException("Organization has already voted");
        }

        return offer;
    }
    private void updateOfferWithOrganizationFeedback(VolunteerOffer offer, double vote) {
        FeedbackVolunteer feedback = FeedbackMapper.createFeedbackVolunteer(vote);
        offer.setVotedByOrganization(true);
        offer.setFeedbackVolunteer(feedback);
    }

    private void updateOfferWithVolunteerFeedback(VolunteerOffer offer, Volunteer volunteer, double vote, VolunteerRequest request) throws IllegalAccessException {
        if (offer.isVotedByVolunteer()) {
            throw new IllegalArgumentException("Volunteer has already voted");
        }

        offer.setVotedByVolunteer(true);
        FeedbackOrganization feedback = FeedbackMapper.createFeedbackOrganization(vote, volunteer.getId(), request);
        offer.setFeedbackOrganization(feedback);

        request.setSommaVoti(request.getSommaVoti() + vote);
        Organization organization = request.getOrganization();

        volunteerOfferDatabaseService.saveVolunteerOffer(offer);
        volunteerRequestDatabaseService.save(request);
        statisticOrganizationService.aggiornaMediaPesataOrganizzazione(organization);
    }

    private void updateVolunteerStatistics(Volunteer volunteer, double vote) {
        StatisticVolunteer statistics = volunteer.getStatistic();
        statistics.addAverageVotes(vote);
        volunteer.setStatistic(statistics);
        volunteerDatabaseService.save(volunteer);
    }
}
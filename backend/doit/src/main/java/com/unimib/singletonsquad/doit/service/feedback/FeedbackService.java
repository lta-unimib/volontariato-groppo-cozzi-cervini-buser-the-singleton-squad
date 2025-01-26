package com.unimib.singletonsquad.doit.service.feedback;

import com.unimib.singletonsquad.doit.database.common.FeedbackDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.common.StatisticOrganization;
import com.unimib.singletonsquad.doit.domain.common.StatisticVolunteer;
import com.unimib.singletonsquad.doit.domain.organization.FeedbackOrganization;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Feedback;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.mappers.FeedbackMapper;
import com.unimib.singletonsquad.doit.service.statistic.StatisticOrganizationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class FeedbackService {


    private final VolunteerOfferDatabaseService volunteerOfferDatabaseService;
    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;
    private final VolunteerDatabaseService volunteerDatabaseService;
    private final StatisticOrganizationService statisticOrganizationService;

    /// ========= L'ORGANIZZAZIONE VOTA IL VOLONTARIO ==============
    public void setOrganizationVoteOffer(Organization organization, Long idRequest, String emailVolontario  ,double vote) throws IllegalAccessException {
        VolunteerOffer offer = volunteerOfferDatabaseService.getVolunteerOfferByRequestId1(idRequest, emailVolontario, organization);
        if(offer.isVotedByOrganization())
            throw new IllegalAccessException("organization already voted");
        Volunteer volunteer = offer.getVolunteer();
        VolunteerRequest request = this.volunteerRequestDatabaseService.getSpecificRequest(offer.getVolunteerRequest().getId());
        Feedback feedback = FeedbackMapper.createFeedback(vote);
        offer.setVotedByOrganization(true);
        offer.setFeedbackVolunteer(feedback);
        volunteerRequestDatabaseService.save(request);
        updateVolunteerStatistic(volunteer, vote);
    }
    /// Metterlo nel VolunteerServiceDatabase apposito
    private void updateVolunteerStatistic(Volunteer volunteer, double vote) {
        StatisticVolunteer temp = volunteer.getStatistic();
        temp.addAverageVotes(vote);
        volunteer.setStatistic(temp);
        volunteerDatabaseService.save(volunteer);
    }

    /// VOLONTARIO VOTA L'EVENTO
    public void setVolunteerVoteRequest(Volunteer volunteer, Long idRequest, double vote) {
        VolunteerRequest request = this.volunteerRequestDatabaseService.getSpecificRequest(idRequest);
        String id = volunteer.getEmail();
        VolunteerOffer offer = this.volunteerOfferDatabaseService.getVolunteerOfferByRequestId(idRequest, id);
        if(offer.isVotedByVolunteer())
            throw new IllegalArgumentException("Volunteer is already voted");

        offer.setVotedByVolunteer(true);
        FeedbackOrganization feedback = new FeedbackOrganization();
        feedback.setVote(vote);
        feedback.setVolunteerId(volunteer.getId());
        feedback.setVolunteerRequest(request);
        offer.setFeedbackOrganization(feedback);
        this.volunteerOfferDatabaseService.saveVolunteerOffer(offer);
        request.setSommaVoti(request.getSommaVoti()+vote);
        Organization organization = request.getOrganization();
        this.volunteerRequestDatabaseService.save(request);
        this.statisticOrganizationService.aggiornaMediaPesataOrganizzazione(organization);


    }



}

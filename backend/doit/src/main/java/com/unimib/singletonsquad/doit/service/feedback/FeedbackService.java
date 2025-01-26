package com.unimib.singletonsquad.doit.service.feedback;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.common.StatisticVolunteer;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Feedback;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.mappers.FeedbackMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class FeedbackService {


    private final VolunteerOfferDatabaseService volunteerOfferDatabaseService;
    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;
    private final VolunteerDatabaseService volunteerDatabaseService;


    public void setOrganizationVoteOffer(Organization organization, Long offerId, double vote) {
        VolunteerOffer offer = volunteerOfferDatabaseService.existsVolunteerOfferByOrganization(offerId, organization);
        Volunteer volunteer = offer.getVolunteer();
        VolunteerRequest request = this.volunteerRequestDatabaseService.getSpecificRequest(offer.getVolunteerRequest().getId());
        Feedback feedback = FeedbackMapper.createFeedback(vote);
        offer.setVotedByOrganization(true);
        request.addFeedback(offer, feedback);
        offer.setFeedback(feedback);
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

    /*
        Il volontario che vota un determinato evento
        --> la Statistica dell'evento è da fare, gabbo la faresti tui
        implementandola come classe astratta
     */

    /// aggiungere il VOTO Statistica all'organizzazione
    public void setVolunteerVoteRequest(Long idRequest, Volunteer volunteer, double vote) {
        VolunteerRequest request = this.volunteerRequestDatabaseService.getSpecificRequest(idRequest);
        VolunteerOffer offer = this.volunteerOfferDatabaseService.getVolunteerOfferByIdVolunteerAndIdRequest(volunteer.getId(), idRequest);
        Feedback feedback = new Feedback();
        feedback.setVote(vote);
        offer.setVotedByVolunteer(true);
        request.addFeedback(offer, feedback);
        this.volunteerOfferDatabaseService.saveVolunteerOffer(offer);
        this.volunteerRequestDatabaseService.save(request);
    }
}

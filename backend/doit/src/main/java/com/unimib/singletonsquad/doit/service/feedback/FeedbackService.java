package com.unimib.singletonsquad.doit.service.feedback;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Feedback;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.repository.IFeedbackRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FeedbackService {


    private final VolunteerOfferDatabaseService volunteerOfferDatabaseService;
    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;
    private final IFeedbackRepository feedbackRepository;
    /// fixme aggiungere anche il voto
    public void setOrganizationVoteOffer(Organization organization, Long offerId, double vote) {
        System.out.println("setOrganizationVoteOffer invoked");
        System.out.println("organization: " + organization);
        System.out.println("offerId: " + offerId);
        System.out.println("vote: " + vote);
        VolunteerOffer offer = volunteerOfferDatabaseService.existsVolunteerOfferByOrganization(offerId, organization);
        Volunteer volunteer = offer.getVolunteer();
        VolunteerRequest request = this.volunteerRequestDatabaseService.getSpecificRequest(offer.getVolunteerRequest().getId());
        Feedback feedback = new Feedback();
        feedback.setVote(vote);
        request.addFeedback(offer, feedback);
        volunteerRequestDatabaseService.save(request);
        //this.addVoteToOffer(offer, 10);
    }

    private void addVoteToOffer(VolunteerOffer offer, int voto) {
        offer.setVotedByOrganization(true);
        //Feedback temp = offer.getFeedback()
        //temp.setVoto(voto)
        // temp.save(temp)
        this.volunteerOfferDatabaseService.saveVolunteerOffer(offer);
    }

    public void setVolunteerVoteRequest(Long idRequest, Volunteer volunteer, double vote) {
        VolunteerRequest request = this.volunteerRequestDatabaseService.getSpecificRequest(idRequest);
        List<VolunteerOffer> offers = request.getVolunteerOffers();
        for (VolunteerOffer offer : offers) {
            if(offer.getVolunteer().equals(volunteer)) {
                offer.setVotedByOrganization(true);
                Feedback feedback = new Feedback();
                feedback.setVote(vote);
                offer.setFeedback(feedback);
                feedbackRepository.save(feedback);
                volunteerRequestDatabaseService.save(request);
                return;
            }
        }
    }

    /// Metodo che aggiorna la media totale dei voti del volontario

}

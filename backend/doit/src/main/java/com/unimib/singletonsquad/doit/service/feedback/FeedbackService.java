package com.unimib.singletonsquad.doit.service.feedback;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FeedbackService {


    private final VolunteerOfferDatabaseService volunteerOfferDatabaseService;
    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;

    /// fixme aggiungere anche il voto
    public void setOrganizationVoteOffer(Organization organization, Long offerId) {
        VolunteerOffer offer = volunteerOfferDatabaseService.existsVolunteerOfferByOrganization(offerId, organization);
        Volunteer volunteer = offer.getVolunteer();
        /// todo aggiungere il voto all' user
        this.addVoteToOffer(offer, 10);
    }

    private void addVoteToOffer(VolunteerOffer offer, int voto) {
        offer.setVotedByOrganization(true);
        //Feedback temp = offer.getFeedback()
        //temp.setVoto(voto)
        // temp.save(temp)
        this.volunteerOfferDatabaseService.saveVolunteerOffer(offer);
    }

    public void setVolunteerVoteRequest(Long idRequest, Volunteer volunteer) {
        VolunteerRequest request = this.volunteerRequestDatabaseService.existsVolunteerRequestByVolunteer(idRequest, volunteer);
    }

    /// Metodo che aggiorna la media totale dei voti del volontario

}

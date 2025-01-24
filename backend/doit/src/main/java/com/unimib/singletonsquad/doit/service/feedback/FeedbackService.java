package com.unimib.singletonsquad.doit.service.feedback;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FeedbackService {


    private final VolunteerOfferDatabaseService volunteerOfferDatabaseService;


    /// fixme aggiungere anche il voto
    public void setOrganizationOffer(Organization organization, Long offerId) {
        VolunteerOffer offer = volunteerOfferDatabaseService.existsVolunteerOfferByOrganization(offerId, organization);
        Volunteer volunteer = offer.getVolunteer();
        /// todo aggiungere il voto all' user
        this.addVoteToOffer(offer, 10);
    }

    private void addVoteToOffer(VolunteerOffer offer, int voto) {
        offer.setVotedByOrganization(true);
        //offer.setVotoOrganization(voto)
        this.volunteerOfferDatabaseService.saveVolunteerOffer(offer);
    }

}

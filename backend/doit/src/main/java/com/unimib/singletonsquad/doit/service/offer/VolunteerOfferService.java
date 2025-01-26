package com.unimib.singletonsquad.doit.service.offer;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.mappers.VolunteerOfferMapper;
import com.unimib.singletonsquad.doit.service.request.VolunteerRequestService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class VolunteerOfferService {

    private final VolunteerOfferDatabaseService volunteerOfferDatabaseService;
    private final VolunteerRequestService volunteerRequestControllerService;
    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;

    /// Get All the Volunteer Offers of a Volunteer
    public List<VolunteerOffer> getAllVolunteerOffers(final String email){
        return this.volunteerOfferDatabaseService.getAllOffersOfTheVolunteer(email);
    }

    /// ADD NEW OFFER
    public void addNewOffer(Long requestId, Volunteer volunteer){
        VolunteerRequest volunteerRequest = this.volunteerRequestDatabaseService.getRequestForAddingNewOffer(requestId);
        this.volunteerOfferDatabaseService.getVolunteerOfferCheckSubscribe(volunteer.getId(), requestId);
        VolunteerOffer volunteerOffer = VolunteerOfferMapper.createAnOffer(volunteer, volunteerRequest);
        int totalParticipantsUpdate = volunteerRequest.getTotalParticipants()+1;
        volunteerRequest.setTotalParticipants(totalParticipantsUpdate);
        this.volunteerOfferDatabaseService.saveVolunteerOffer(volunteerOffer);
        this.volunteerRequestControllerService.addVolunteerOffer(volunteerRequest.getId(), volunteerOffer);
        volunteerRequest.decreaseCapacity();
        this.volunteerRequestDatabaseService.save(volunteerRequest);
    }


    /// REMOVE A OFFER
    /*
    public void removeOffer(long offerId, String email) throws IllegalAccessException {
    VolunteerOffer offer = volunteerOfferDatabaseService.getVolunteerOffer(offerId);
        if(offer.isOrganizationOffer(email) || offer.isVolunteerOffer(email)) {
            this.volunteerOfferDatabaseService.deleteVolunteerOffer(offer);
        } else
            throw new IllegalAccessException("Dont have the correct email");
    }
    */

    /// REMOVE A OFFER
    public void removeOfferByRequest(long requestId, String email) {
        volunteerOfferDatabaseService.deleteVolunteerOffer(requestId, email);
    }
}

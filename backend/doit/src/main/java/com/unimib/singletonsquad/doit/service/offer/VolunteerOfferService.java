package com.unimib.singletonsquad.doit.service.offer;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.mappers.OfferMapper;
import com.unimib.singletonsquad.doit.service.request.VolunteerRequestService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class VolunteerOfferService {

    private final VolunteerOfferDatabaseService volunteerOfferDatabaseService;
    private final VolunteerRequestService volunteerRequestControllerService;
    private final RegisteredUserService registeredUserService;

    /// Get All the Volunteer Offers of a Volunteer
    public List<VolunteerOffer> getAllVolunteerOffers(final String email){
        return this.volunteerOfferDatabaseService.getAllOffersOfTheVolunteer(email);
    }

    /// ADD NEW OFFER
    public void addNewOffer(Long requestId, String email) throws Exception {
        Volunteer volunteer = (Volunteer) this.registeredUserService.getUserInformations(email, UserRole.VOLUNTEER);
        VolunteerRequest volunteerRequest = this.volunteerRequestControllerService.getSpecificRequest(requestId);
        VolunteerOffer volunteerOffer = OfferMapper.toOffer(volunteer, volunteerRequest);
        this.volunteerOfferDatabaseService.saveVolunteerOffer(volunteerOffer);
        this.volunteerRequestControllerService.addVolunteerOffer(volunteerRequest.getId(), volunteerOffer);
    }

    /// REMOVE A OFFER
    public void removeOffer(long offerId, String email) throws IllegalAccessException {
    VolunteerOffer offer = volunteerOfferDatabaseService.getVolunteerOffer(offerId);
        if(offer.isOrganizationOffer(email) || offer.isVolunteerOffer(email)) {
            this.volunteerOfferDatabaseService.deleteVolunteerOffer(offer);
        } else
            throw new IllegalAccessException("Dont have the correct email");
    }

    /// REMOVE A OFFER
    public void removeOfferByRequest(long requestId, String email) {
        volunteerOfferDatabaseService.deleteVolunteerOffer(requestId, email);
    }
}

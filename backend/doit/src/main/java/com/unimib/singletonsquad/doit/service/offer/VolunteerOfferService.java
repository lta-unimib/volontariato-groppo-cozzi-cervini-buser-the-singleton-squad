package com.unimib.singletonsquad.doit.service.offer;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.domain.common.Status;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.received.VolunteerOfferDTO;
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

    public List<VolunteerOffer> getAllVolunteerOffers(final String email) throws Exception {
        return this.volunteerOfferDatabaseService.getAllVolunteerOffers(email);
    }

    /// ADD NEW OFFER
    public void addNewOffer(Long requestId, String email) throws Exception {
        Volunteer volunteer = (Volunteer) this.registeredUserService.getUserInformations(email, UserRole.volunteer);
        VolunteerRequest volunteerRequest = this.volunteerRequestControllerService.getSpecificRequest(requestId);
        VolunteerOffer volunteerOffer = OfferMapper.toOffer(volunteer, volunteerRequest);
        this.volunteerOfferDatabaseService.saveVolunteerOffer(volunteerOffer);
        this.volunteerRequestControllerService.addVolunteerOffer(volunteerRequest.getId(), volunteerOffer);
    }

    public void removeOffer(long offerId, String email) throws Exception {
    VolunteerOffer offer = volunteerOfferDatabaseService.getVolunteerOffer(offerId);
        if(offer.isOrganizationOffer(email) || offer.isVolunteerOffer(email)) {
            removeOfferFromDatabase(offerId);
        } else
            throw new IllegalAccessException("Dont have the correct email");
    }

    private void removeOfferFromDatabase(Long id) throws Exception {
        VolunteerOffer offer = this.volunteerOfferDatabaseService.getVolunteerOffer(id);
        this.volunteerOfferDatabaseService.deleteVolunteerOffer(offer);
    }

    /// UPDATED A OFFER


    /// ACCEPT A OFFER

    /// DECLINE A OFFER



}

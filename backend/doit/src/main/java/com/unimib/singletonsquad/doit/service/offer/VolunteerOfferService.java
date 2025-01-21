package com.unimib.singletonsquad.doit.service.offer;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;
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
    private final RegisteredUserService checkUserIsRegisteredDatabaseService;

    public List<VolunteerOffer> getAllVolunteerOffers(final String email) throws Exception {
        this.checkUserIsRegisteredDatabaseService.isRegistered(email, UserRole.volunteer);
        return this.volunteerOfferDatabaseService.getAllVolunteerOffers(email);
    }

    /// ADD NEW OFFER
    public void addNewOffer(VolunteerOfferDTO volunteerOfferDTO, String email) throws Exception {
        Volunteer volunteer = (Volunteer) this.checkUserIsRegisteredDatabaseService.getFromDatabaseByEmail(email, UserRole.volunteer);
        VolunteerRequest volunteerRequest = this.volunteerRequestControllerService.getSpecificRequest(volunteerOfferDTO.getVolunteerRequestId());
        VolunteerOffer volunteerOffer = OfferMapper.toOffer(volunteerOfferDTO, volunteer, volunteerRequest);
        this.volunteerOfferDatabaseService.saveVolunteerOffer(volunteerOffer);
    }

    /// REMOVE A OFFER

    /// UPDATED A OFFER


    /// ACCEPT A OFFER

    /// DECLINE A OFFER



}

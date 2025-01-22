package com.unimib.singletonsquad.doit.service.offer;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.recived.VolunteerOfferDTO;
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
    ///TODO implementare che ID del JSON è lo stesso dell'email
    public void addNewOffer(VolunteerOfferDTO volunteerOfferDTO, String email) throws Exception {
        System.out.println("DEBUG => "+volunteerOfferDTO);
        Volunteer volunteer = (Volunteer) this.registeredUserService.getUserInformations(email, UserRole.volunteer);
        VolunteerRequest volunteerRequest = this.volunteerRequestControllerService.getSpecificRequest(volunteerOfferDTO.getVolunteerRequestId());
        VolunteerOffer volunteerOffer = OfferMapper.toOffer(volunteerOfferDTO, volunteer, volunteerRequest);
        this.volunteerOfferDatabaseService.saveVolunteerOffer(volunteerOffer);
        this.volunteerRequestControllerService.addVolunteerOffer(volunteerRequest.getId(), volunteerOffer);
    }




    /// REMOVE A OFFER --> ORGANIZATION
    public void removeOffer(long offerId, String email) throws Exception {
    VolunteerOffer offer = volunteerOfferDatabaseService.getVolunteerOffer(offerId);
        if(offer.getOrganization().getEmail().equals(email))
            volunteerOfferDatabaseService.deleteVolunteerOffer(offer);
        else
            throw new IllegalAccessException("Dont have the correct email");
        
    }

    /// CANCEL A OFFER ---> VOLUNTEER
    public void cancelVolunteerOffer(Long idOffer, String emailVolunteer) throws Exception {
        VolunteerOffer offer = volunteerOfferDatabaseService.getVolunteerOffer(idOffer);
        if(offer.getVolunteer().getEmail().equals(emailVolunteer))
            volunteerOfferDatabaseService.deleteVolunteerOffer(offer);

        else
            throw new IllegalAccessException("Dont have the correct email");

    }

    /// UPDATED A OFFER


    /// ACCEPT A OFFER

    /// DECLINE A OFFER



}

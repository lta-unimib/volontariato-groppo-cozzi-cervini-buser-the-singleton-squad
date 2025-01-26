package com.unimib.singletonsquad.doit.controller.offerVolontario;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.dto.received.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.mappers.VolunteerOfferMapper;
import com.unimib.singletonsquad.doit.service.offer.VolunteerOfferService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.management.relation.RoleInfoNotFoundException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/offer")
public class VolunteerOfferController {
    private final VolunteerOfferService volunteerOfferService;
    private final RegisteredUserService registeredUserService;


    /// L'UTENTE ACCETTA LA RICHIESTA DI VOLONTARIATO
    @PostMapping(value = "/subscribe/{requestId}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> createVolunteerOffer(final HttpServletRequest request,
                                                  final @PathVariable Long requestId){
        Volunteer volunteer = (Volunteer) this.registeredUserService.getUserInformationAndIsRegistered(UserRole.VOLUNTEER, request);
        this.volunteerOfferService.addNewOffer(requestId,volunteer);
        return  ResponseMessageUtil.createResponseSuccess("volunteer offer saved", HttpStatus.OK, null);

    }

    /// ORGANIZZAZION ED VOLUNTEER DECLINE A OFFER
    @DeleteMapping("/unsubscribe/{idRequest}/")
    public ResponseEntity<ResponseMessage> deleteVolunteerOfferByRequest(@PathVariable final Long idRequest,
                                                                final HttpServletRequest request) throws RoleInfoNotFoundException {
        String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.VOLUNTEER, request);
        this.volunteerOfferService.removeOfferByRequest(idRequest, email);
        return ResponseMessageUtil.createResponseSuccess("volunteer offer deleted", HttpStatus.OK, null);
    }

    /// GET ALL VOLUNTEER OFFER
    @GetMapping("/all/")
    public ResponseEntity<ResponseMessage> getAllVolunteerOffers(final HttpServletRequest request) throws RoleInfoNotFoundException {
        String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.VOLUNTEER, request);
        List<VolunteerOffer> volunteerOffers = this.volunteerOfferService.getAllVolunteerOffers(email);
        List<VolunteerOfferDTO> volunteerOfferDTOS = VolunteerOfferMapper.getListVolunteerOfferDTO(volunteerOffers);
        return ResponseMessageUtil.createResponseSuccess("get all volunteer offers", HttpStatus.OK, volunteerOfferDTOS);
    }

}

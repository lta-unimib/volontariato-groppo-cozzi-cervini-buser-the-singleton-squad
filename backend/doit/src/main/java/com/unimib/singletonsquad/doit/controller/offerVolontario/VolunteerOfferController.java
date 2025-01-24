package com.unimib.singletonsquad.doit.controller.offerVolontario;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.dto.received.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.mappers.VolunteerOfferMapper;
import com.unimib.singletonsquad.doit.service.offer.VolunteerOfferAcceptService;
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
    private final VolunteerOfferAcceptService acceptService;


    /// L'UTENTE ACCETTA LA RICHIESTA DI VOLONTARIATO
    @PostMapping(value = "/subscribe/{requestId}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> createVolunteerOffer(final HttpServletRequest request,
                                                  final @PathVariable String requestId)
            throws Exception {
            String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.VOLUNTEER, request);
            this.volunteerOfferService.addNewOffer(Long.parseLong(requestId), email);
            return  ResponseMessageUtil.createResponseSuccess("volunteer offer saved", HttpStatus.OK, null);

    }

    /// ORGANIZZAZION ED VOLUNTEER DECLINE A OFFER
    @DeleteMapping("/{idOffer}")
    public ResponseEntity<ResponseMessage> deleteVolunteerOffer(@PathVariable final Long idOffer,
                                                                final HttpServletRequest request) throws IllegalAccessException, RoleInfoNotFoundException {
        UserRole role = UserRole.valueOf(this.registeredUserService.checkAndGetRoleFromRequest(request));
        String email = this.registeredUserService.getUserEmailAndIsRegistered(role, request);
        this.volunteerOfferService.removeOffer(idOffer, email);
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

    /// A ORGANIZATION ACCEPT A VOLUNTEER OFFER
    @PostMapping(value = "/accept/{idOffer}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> acceptOffer(final @PathVariable Long idOffer, final HttpServletRequest request) throws IllegalAccessException, RoleInfoNotFoundException {
        String organizationEmail = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.ORGANIZATION, request);
        this.acceptService.acceptVolunteerOffer(idOffer, organizationEmail);
        return ResponseMessageUtil.createResponseSuccess(String.format("Accept offer %s", idOffer), HttpStatus.OK, null);
    }

    /// A ORGANIZATION REJECT A VOLUNTEER OFFER
    @PostMapping(value = "/reject/{idOffer}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> rejectOffer(final @PathVariable Long idOffer, final HttpServletRequest request) throws IllegalAccessException, RoleInfoNotFoundException {
        String emailOrganization = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.ORGANIZATION, request);
        this.acceptService.rejectVolunteerOffer(idOffer, emailOrganization);
        return ResponseMessageUtil.createResponseSuccess(String.format("Reject offer %s", idOffer), HttpStatus.OK, null);
    }

}

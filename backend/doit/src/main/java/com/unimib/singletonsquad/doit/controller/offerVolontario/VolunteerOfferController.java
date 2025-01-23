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
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/offer")
public class VolunteerOfferController {
    private final VolunteerOfferService volunteerOfferService;
    private final RegisteredUserService registeredUserService;
    private final VolunteerOfferAcceptService acceptService;


    /// L'UTENTE ACCETTA LA RICHIESTA DI VOLONTARIATO
    @PostMapping(value = "/new/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> createVolunteerOffer(final HttpServletRequest request,
                                                  final @RequestBody VolunteerOfferDTO volunteerOfferDTO)
            throws Exception {
            String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer, request);
            this.volunteerOfferService.addNewOffer(volunteerOfferDTO, email);
            return  ResponseMessageUtil.createResponseSuccess("volunteer offer saved", HttpStatus.OK, null);

    }

    /// ORGANIZZAZION ED VOLUNTEER DECLINE A OFFER
    @DeleteMapping("/{idOffer}")
    public ResponseEntity<ResponseMessage> deleteVolunteerOffer(@PathVariable final Long idOffer,
                                                                final HttpServletRequest request) throws Exception {
        UserRole role = UserRole.valueOf(this.registeredUserService.checkAndGetRoleFromRequest(request));
        String email = this.registeredUserService.getUserEmailAndIsRegistered(role, request);
        this.volunteerOfferService.removeOffer(idOffer, email);
        return ResponseMessageUtil.createResponseSuccess("volunteer offer deleted", HttpStatus.OK, null);
    }

    /// GET ALL VOLUNTEER OFFER
    @GetMapping("/all/")
    public ResponseEntity<ResponseMessage> getAllVolunteerOffers(final HttpServletRequest request) throws Exception {
        String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer, request);
        List<VolunteerOffer> volunteerOffers = this.volunteerOfferService.getAllVolunteerOffers(email);
        List<VolunteerOfferDTO> volunteerOfferDTOS = VolunteerOfferMapper.getListVolunteerOfferDTO(volunteerOffers);
        return ResponseMessageUtil.createResponseSuccess("get all volunteer offers", HttpStatus.OK, volunteerOfferDTOS);
    }

    /// A ORGANIZATION ACCEPT A VOLUNTEER OFFER
    @PostMapping(value = "/accept/{idOffer}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> acceptOffer(final @PathVariable Long idOffer, final HttpServletRequest request) throws Exception {
        String organizationEmail = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.organization, request);
        this.acceptService.acceptVolunteerOffer(idOffer, organizationEmail);
        return ResponseMessageUtil.createResponseSuccess(String.format("Accept offer %s", idOffer), HttpStatus.OK, null);
    }

}

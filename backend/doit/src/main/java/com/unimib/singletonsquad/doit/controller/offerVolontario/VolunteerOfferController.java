package com.unimib.singletonsquad.doit.controller.offerVolontario;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.dto.received.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.mappers.OfferMapper;
import com.unimib.singletonsquad.doit.service.offer.VolunteerOfferService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.service.user.UserProfileService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/offer")
public class VolunteerOfferController {
    private final VolunteerOfferService volunteerOfferService;
    private final RegisteredUserService registeredUserService;
    private final UserProfileService userProfileService;

    /// L'UTENTE ACCETTA LA RICHIESTA DI VOLONTARIATO
    @PostMapping(value = "/new/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> createVolunteerOffer(final HttpServletRequest request,
                                                  final @RequestBody VolunteerOfferDTO volunteerOfferDTO)
            throws Exception {
            String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer, request);
            this.volunteerOfferService.addNewOffer(volunteerOfferDTO, email);

            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer offer saved", HttpStatus.OK);
            return ResponseEntity.ok().body(message);

    }

    @DeleteMapping("/{idOffer}/")
    public ResponseEntity<ResponseMessage> deleteVolunteerOffer(@PathVariable("idOffer") Long idOffer, final HttpServletRequest request) throws Exception {
        ResponseMessage responseMessage;
        UserRole role = registeredUserService.getRoleFromToken(request.getHeader("Authorization"));
        String email = registeredUserService.getUserEmailAndIsRegistered(role, request);
        volunteerOfferService.removeOffer(idOffer, email);
        responseMessage = new ResponseMessage.Builder("volunteer offer removed").status(HttpStatus.OK).build();
        return ResponseEntity.ok(responseMessage);
    }

    @GetMapping("/all/")
    public ResponseEntity<ResponseMessage> getAllVolunteerOffers(final HttpServletRequest request) throws Exception {
        ResponseMessage responseMessage;
        String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer, request);

        List<VolunteerOfferDTO> volunteerOfferDTOS = new ArrayList<>();
        for (VolunteerOffer v : volunteerOfferService.getAllVolunteerOffers(email)) {
            volunteerOfferDTOS.add(OfferMapper.toOfferDTO(v));
        }
        responseMessage = ResponseMessageUtil.createResponse("get all volunteer offers", HttpStatus.OK,
                volunteerOfferDTOS);
        return ResponseEntity.ok(responseMessage);
    }

}

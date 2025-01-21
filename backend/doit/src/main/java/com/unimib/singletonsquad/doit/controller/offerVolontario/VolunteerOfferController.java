package com.unimib.singletonsquad.doit.controller.offerVolontario;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.mappers.OfferMapper;
import com.unimib.singletonsquad.doit.service.offer.VolunteerOfferService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.authentication.UserVerify;
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
import java.util.Objects;

@RestController
@AllArgsConstructor
@RequestMapping("/offer")
public class VolunteerOfferController {
    private final VolunteerOfferService volunteerOfferService;
    private final RegisteredUserService registeredUserService;

    @PostMapping(value = "/new/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> createVolunteerOffer(final HttpServletRequest request,
                                                  final @RequestBody VolunteerOfferDTO volunteerOfferDTO)
            throws Exception {
            String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer);
            this.volunteerOfferService.addNewOffer(volunteerOfferDTO, email);

            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer offer saved", HttpStatus.OK);
            return ResponseEntity.ok().body(message);

    }


    @DeleteMapping(value = "/{idOffer}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> deleteVolunteerOffer(@PathVariable("idOffer") Long idOffer)
            throws Exception {
        ResponseMessage responseMessage;
        String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer);
        volunteerOfferService.removeOffer(idOffer, email);
        responseMessage = new ResponseMessage.Builder("volunteer offer removed").status(HttpStatus.OK).build();
        return ResponseEntity.ok(responseMessage);
    }

    @GetMapping("/all/")
    public ResponseEntity<ResponseMessage> getAllVolunteerOffers() throws Exception {
        ResponseMessage responseMessage;
        String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer);

        List<VolunteerOfferDTO> volunteerOfferDTOS = new ArrayList<>();
        for (VolunteerOffer v : volunteerOfferService.getAllVolunteerOffers(email)) {
            volunteerOfferDTOS.add(OfferMapper.toOfferDTO(v));
        }
        responseMessage = ResponseMessageUtil.createResponse("get all volunteer offers", HttpStatus.OK,
                volunteerOfferDTOS);
        return ResponseEntity.ok(responseMessage);
    }

    /// ACCEPT A REQUEST FTOM USER
}

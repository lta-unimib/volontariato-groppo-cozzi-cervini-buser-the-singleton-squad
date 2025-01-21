package com.unimib.singletonsquad.doit.controller.offerVolontario;

import com.unimib.singletonsquad.doit.domain.common.User;
import com.unimib.singletonsquad.doit.dto.VolunteerOfferDTO;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerOfferDatabaseService;
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

@RestController
@AllArgsConstructor
@RequestMapping("/offer")
public class VolunteerOfferController {
    private final VolunteerOfferService volunteerOfferService;
    private final UserVerify userVerify;
    private final RegisteredUserService registeredUserService;

    @PostMapping(value = "/new/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createVolunteerRequest(final HttpServletRequest request,
                                                    final @RequestBody VolunteerOfferDTO volunteerOfferDTO)
            throws Exception {
            String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer);
            this.volunteerOfferService.addNewOffer(volunteerOfferDTO, email);

            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer offer saved", HttpStatus.OK);
            return ResponseEntity.ok().body(message);

    }


    @DeleteMapping(value = "/{idOffer}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage deleteVolunteer(@PathVariable("idOffer") Long idOffer){
        //todo aggiungere la verifica
        this.volunteerOfferService.deleteOffer(idOffer);
        return null;
    }






    /// ACCEPT A REQUEST FTOM USER
}

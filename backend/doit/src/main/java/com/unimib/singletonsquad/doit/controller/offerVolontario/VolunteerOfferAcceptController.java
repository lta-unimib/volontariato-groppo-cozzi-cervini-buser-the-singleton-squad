package com.unimib.singletonsquad.doit.controller.offerVolontario;

import com.unimib.singletonsquad.doit.service.offer.VolunteerOfferAcceptService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/request/")
public class VolunteerOfferAcceptController {

    private final RegisteredUserService registeredUserService;
    private final VolunteerOfferAcceptService acceptService;

    /// TODO:
    /// VERIFICARE CHE ESISTE OFFERTA
    /// VERIFICARE CHE CHI CHIAMA HA STESSA EMAIL = ORGANIZZAZIONE
    /// CAPACITà > 0 --> CAPACITà =0
    /// CAPACITà RICHIESTA - 1
    /// CAMBIARE LO STATO
    /// AGGIUNGERE NELLA RICHIESTA NELL'OFFERTA LA LISTA L'OFFERTA
    /// TODO CONTROLLARE CHE LA START DATE >=OGGI
    @PostMapping(value = "/accept/{idOffer}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> acceptOffer(final @PathVariable Long idOffer, final HttpServletRequest request) throws Exception {
        String organizationEmail = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.organization, request);
        this.acceptService.acceptVolunteerOffer(idOffer, organizationEmail);
        return ResponseEntity.ok().body("accepted");
    }
}

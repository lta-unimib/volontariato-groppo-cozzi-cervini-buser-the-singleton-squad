package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.service.request.VolunteerRequestListService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/request/volunteer/list")
@AllArgsConstructor
public class VolunteerRequestVolunteerListController {

    private final RegisteredUserService registeredUserService;
    private final VolunteerRequestListService volunteerRequestListService;

    // Ottieni la lista delle richieste di volontari
    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> getListVolunteerRequestVolunteerList(final HttpServletRequest request) {
        // Ottieni l'organizzazione dall'utente registrato
        Organization organization = (Organization) this.registeredUserService.getUserInformationAndIsRegistered(UserRole.ORGANIZATION, request);

        // Ottieni la lista delle richieste in formato oggetto (mappa o lista)
        Object res = this.volunteerRequestListService.getRequestList(organization);

        // Restituisci la risposta con i dati come oggetto
        return ResponseMessageUtil.createResponseSuccess("get", HttpStatus.OK, res);
    }

    // Ottieni la lista specifica di richieste di volontari per un evento specifico
    @GetMapping(value = "/{idRequest}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getListVolunteerRequestVolunteerListByIdRequest(final HttpServletRequest request, final @PathVariable("idRequest") Long idRequest) {
        // Ottieni l'organizzazione dall'utente registrato
        Organization organization = (Organization) this.registeredUserService.getUserInformationAndIsRegistered(UserRole.ORGANIZATION, request);

        // Ottieni la lista delle richieste specifiche in formato oggetto
        Object res = this.volunteerRequestListService.getRequestListSpecific(organization, idRequest);

        // Restituisci la risposta con i dati come oggetto
        return ResponseMessageUtil.createResponseSuccess("get", HttpStatus.OK, res);
    }
}

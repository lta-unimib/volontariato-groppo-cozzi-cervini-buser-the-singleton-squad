package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.exception.auth.InvalidRoleGeneralException;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import com.unimib.singletonsquad.doit.service.request.VolunteerRequestControllerService;
import com.unimib.singletonsquad.doit.utils.UserRole;
import com.unimib.singletonsquad.doit.utils.UserVerify;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.response.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/request")
public class VolunteerRequestController {

    @Autowired
    private VolunteerRequestControllerService volunteerRequestControllerService;
    @Autowired
    private UserVerify userVerify;


    @PostMapping(value = "/new/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createVolunteerRequest(final @RequestBody VolunteerRequestDTO volunteerRequestDTO, final HttpServletRequest request)
            throws Exception {
            this.userVerify.checkUserRoleFromToken(request, UserRole.volunteer); //cambiare in organizzazione
            this.volunteerRequestControllerService.createVolunteerRequest(volunteerRequestDTO);
            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request created", HttpStatus.OK);
            return ResponseEntity.ok().body(message);
    }

    @GetMapping(value = "/{idRequest}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSpecificRequest(final @PathVariable("idRequest") Long idRequest, final HttpServletRequest request)
            throws Exception {
        if(!this.userVerify.checkRoleFromRequest(request))
            throw new InvalidRoleGeneralException("You do not have the required role");

        VolunteerRequest specificRequest = this.volunteerRequestControllerService.getSpecificRequest(idRequest);
        ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request got", HttpStatus.OK, specificRequest);
        return ResponseEntity.ok().body(message);
    }

    @DeleteMapping(value = "/{idRequest}/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteVolunteerRequest(final @PathVariable Long idRequest, final HttpServletRequest request)
    throws Exception {
            this.userVerify.checkUserRoleFromToken(request, UserRole.organization);
            this.volunteerRequestControllerService.deleteVolunteerRequest(idRequest);
            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request deleted", HttpStatus.OK);
            return ResponseEntity.ok().body(message);
    }

    @PutMapping(value = "/{idRequest}/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateVolunteerRequest(final @PathVariable Long idRequest, final HttpServletRequest request,
                                                    final @RequestBody VolunteerRequestDTO volunteerRequestDTO)
    throws Exception {
            this.userVerify.checkUserRoleFromToken(request, UserRole.organization);
            this.volunteerRequestControllerService.updateVolunteerRequest(volunteerRequestDTO, idRequest);
            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request updated", HttpStatus.OK);
            return ResponseEntity.ok().body(message);
    }

    //TODO --> ALGORITMO DI MATCHING

    /**
    @GetMapping("/ottieni")
    public ResponseEntity<?> getVolunteerRequestsAlgorithm(){
        /**
        TODO OPERAZIONI PRELIMINARI

        - Cercare file che contiene latitudine e longitudine delle città Lombardia
            - inserirlo nel database come tabella singola

        - Token --> email + ruolo ==> solo VOLONTARIO??
        - I parametri si recuperano dal database
        - Creazione di un oggetto apposito: Voto, Preferenza --> l'ordinamento verrà per il voto
        - per fare SORTING:
            List<MyObject> sortedList = list.parallelStream()
                            .sorted(Comparator.comparing(MyObject::getName))
                            .collect(Collectors.toList());

        - la ricerca della città, la si fa per nome


        TODO ALGORITMO

            0) dal token, ottengo Preferenze Temporali, Categorie e Città [recuperarla con il postalCode],
            1) chiamata per prendere le volunteer request
            2) Creare un oggetto che inserire il voto di match tra preferenze utente e richiesta
            3) Calcolare la distanza per ogni città della richiesta con la città dell'utente[database] <-->  città-richiesta
                3.0 effettuare per richiesta una chiamata del database: nomeCittà, ed ottiene latitudine e longitudine
                3.1 calcolare distanza per ogni città della richiesta
                3.2 assegnare un voto in base alla distanza

            4) assegnavo un voto :le richieste in base alle categorie_preferite
                4.1 --> 1: se almeno una preferenza utente è inserita nelle categorie della richiesta
                    --> 0: altrimenti

            5) assegnare il voto rispetto alla disponibilità temporale

            6) ordinare le richieste in base al campo voto

            TODO IDEA GENERALE DI VOTO
            distanza 30%
            categorie_preferite 40%
            disponibilità_temporale 30%
        */
}

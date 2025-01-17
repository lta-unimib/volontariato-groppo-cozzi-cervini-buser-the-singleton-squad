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
            this.userVerify.checkUserRoleFromToken(request, UserRole.organization);
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
        ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request deleted", HttpStatus.OK, specificRequest);
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

    //TODO
    /*
    @GetMapping("/ottieni")
    public ResponseEntity<List<VolunteerRequestDTO>> getVolunteerRequestsParam(@RequestParam String city,
                                                                          @RequestParam String startDate,
                                                                          @RequestParam String endDate,
                                                                          @RequestParam String categories)
    {
        return null;
    }

    @GetMapping("/ottieni")
    public ResponseEntity<List<VolunteerRequestDTO>> getVolunteerRequestsAlgorithm(){
        /** todo
            distanza 30%
            categorie_preferite 40%
            disponibilità_temporale 30%

            classe che contiene tutte le richieste di volontariato, tipo catalogo
            CONTROLLER --> SERVICE --> REPOSITORY --> SERVICE, elabora e le riordina, --> CONTROLLER --> RISPOSTA
        */
    /*

        return null;
    }*/

}

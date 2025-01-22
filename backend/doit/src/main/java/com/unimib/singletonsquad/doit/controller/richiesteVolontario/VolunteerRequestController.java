package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.recived.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.mappers.VolunteerRequestMapper;
import com.unimib.singletonsquad.doit.service.request.VolunteerRequestService;
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

@RestController
@RequestMapping("/request")
@AllArgsConstructor
public class VolunteerRequestController {

    private final VolunteerRequestService volunteerRequestControllerService;
    private final RegisteredUserService registeredUserService;


    @PostMapping(value = "/new/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createVolunteerRequest(final @RequestBody VolunteerRequestDTO volunteerRequestDTO, final HttpServletRequest request)
            throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.organization, request);
        this.volunteerRequestControllerService.createVolunteerRequest(volunteerRequestDTO, email);
        ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request created", HttpStatus.OK);
        return ResponseEntity.ok().body(message);
    }

    @GetMapping(value = "/{idRequest}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSpecificRequest(final @PathVariable("idRequest") Long idRequest, final HttpServletRequest request)
            throws Exception {
       this.registeredUserService.checkRole(request);
       VolunteerRequest specificRequest = this.volunteerRequestControllerService.getSpecificRequest(idRequest);
       ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request got", HttpStatus.OK, VolunteerRequestMapper.mapToVolunteerRequestDTO(specificRequest));
       return ResponseEntity.ok().body(message);
    }

    @DeleteMapping(value = "/{idRequest}/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteVolunteerRequest(final @PathVariable Long idRequest, final HttpServletRequest request)
    throws Exception {
            String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.organization, request);
            this.volunteerRequestControllerService.deleteVolunteerRequest(idRequest, email);
            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request deleted", HttpStatus.OK);
            return ResponseEntity.ok().body(message);
    }

    @PutMapping(value = "/{idRequest}/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateVolunteerRequest(final @PathVariable Long idRequest, final HttpServletRequest request,
                                                    final @RequestBody VolunteerRequestDTO volunteerRequestDTO)
    throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.organization, request);
        this.volunteerRequestControllerService.updateVolunteerRequest(volunteerRequestDTO, idRequest, email);
            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request updated", HttpStatus.OK);
            return ResponseEntity.ok().body(message);
    }
    /// Restituisce tutte le richieste ordinate

}

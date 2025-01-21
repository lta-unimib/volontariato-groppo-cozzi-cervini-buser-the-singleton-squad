package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.database.common.CityInfoDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.service.request.VolunteerRequestService;
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

import java.util.List;

@RestController
@RequestMapping("/request")
@AllArgsConstructor
public class VolunteerRequestController {

    private final VolunteerRequestService volunteerRequestControllerService;
    private final UserVerify userVerify;
    private final CityInfoDatabaseService test;


    @PostMapping(value = "/new/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createVolunteerRequest(final @RequestBody VolunteerRequestDTO volunteerRequestDTO, final HttpServletRequest request)
            throws Exception {
        String email = this.userVerify.validateUserRoleFromToken(request, UserRole.organization);
        this.volunteerRequestControllerService.createVolunteerRequest(volunteerRequestDTO, email);
        ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request created", HttpStatus.OK);
        return ResponseEntity.ok().body(message);
    }

    @GetMapping(value = "/{idRequest}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSpecificRequest(final @PathVariable("idRequest") Long idRequest, final HttpServletRequest request)
            throws Exception {
       this.userVerify.isRoleValidFromRequest(request);
       VolunteerRequest specificRequest = this.volunteerRequestControllerService.getSpecificRequest(idRequest);
       ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request got", HttpStatus.OK, specificRequest);
       return ResponseEntity.ok().body(message);
    }

    @DeleteMapping(value = "/{idRequest}/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteVolunteerRequest(final @PathVariable Long idRequest, final HttpServletRequest request)
    throws Exception {
            String email = this.userVerify.validateUserRoleFromToken(request, UserRole.organization);
            this.volunteerRequestControllerService.deleteVolunteerRequest(idRequest);
            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request deleted", HttpStatus.OK);
            return ResponseEntity.ok().body(message);
    }

    @PutMapping(value = "/{idRequest}/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateVolunteerRequest(final @PathVariable Long idRequest, final HttpServletRequest request,
                                                    final @RequestBody VolunteerRequestDTO volunteerRequestDTO)
    throws Exception {
        String email = this.userVerify.validateUserRoleFromToken(request, UserRole.organization);
        this.volunteerRequestControllerService.updateVolunteerRequest(volunteerRequestDTO, idRequest, email);
            ResponseMessage message = ResponseMessageUtil.createResponse("volunteer request updated", HttpStatus.OK);
            return ResponseEntity.ok().body(message);
    }

    /// Restituisce tutte le richieste ordinate
    @GetMapping(value = "/all/")
    public ResponseEntity<?> getVolunteerRequest(final HttpServletRequest request) throws Exception {
        String email = this.userVerify.validateUserRoleFromToken(request, UserRole.volunteer);
        List<VolunteerRequest> volunteerRequestSortedList = this.volunteerRequestControllerService.getAllRequestSorted(email);
        ResponseMessage message = ResponseMessageUtil.createResponse("get all requests", HttpStatus.OK, volunteerRequestSortedList);
        return ResponseEntity.ok().body(message);
    }

    @GetMapping(value = "/all/organization/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllVolunteerRequestOrganization(final HttpServletRequest request) throws Exception {
        String email = this.userVerify.validateUserRoleFromToken(request, UserRole.organization);
        List<VolunteerRequest> volunteerRequestList = this.volunteerRequestControllerService.getAllRequestByOrganizationEmail(email);
        ResponseMessage message = ResponseMessageUtil.createResponse("get all request by organization", HttpStatus.OK, volunteerRequestList);
        return ResponseEntity.ok().body(message);
    }

}

package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.received.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestSendDTO;
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

import javax.management.relation.RoleInfoNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequestMapping("/request")
@AllArgsConstructor
public class VolunteerRequestController {

    private final VolunteerRequestService volunteerRequestService;
    private final RegisteredUserService registeredUserService;
    private final VolunteerRequestMapper volunteerRequestMapper;

    /// Inserire una nuova richiesta
    @PostMapping(value = "/new/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> createVolunteerRequest(final @RequestBody VolunteerRequestDTO volunteerRequestDTO, final HttpServletRequest request){
        Organization organization = (Organization) this.registeredUserService.getUserInformationAndIsRegistered(UserRole.ORGANIZATION, request);
        this.volunteerRequestService.createVolunteerRequest(volunteerRequestDTO, organization);
        return ResponseMessageUtil.createResponseSuccess("volunteer request created", HttpStatus.OK, null);
    }

    /// Ottenere una specifica richiesta
    @GetMapping(value = "/{idRequest}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> getSpecificRequest(final @PathVariable("idRequest") Long idRequest, final HttpServletRequest request) throws UnsupportedEncodingException, InterruptedException {
       this.registeredUserService.extractRoleFromRequest(request);
       VolunteerRequest specificRequest = this.volunteerRequestService.getSpecificRequest(idRequest);
       VolunteerRequestSendDTO requestDTO = this.volunteerRequestMapper.mapToVolunteerRequestDTO(specificRequest);
       return ResponseMessageUtil.createResponseSuccess("volunteer request got", HttpStatus.OK,requestDTO);
    }

    /// Cancellare una specifica richiesta
    @DeleteMapping(value = "/{idRequest}/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> deleteVolunteerRequest(final @PathVariable Long idRequest, final HttpServletRequest request) throws IllegalAccessException {
        Organization organization = (Organization) this.registeredUserService.getUserInformationAndIsRegistered(UserRole.ORGANIZATION, request);
        this.volunteerRequestService.deleteVolunteerRequest(idRequest, organization);
        return ResponseMessageUtil.createResponseSuccess("volunteer request deleted", HttpStatus.OK, null);
    }

    /// Modificare una richiesta
    @PutMapping(value = "/{idRequest}/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> updateVolunteerRequest(final @PathVariable Long idRequest, final HttpServletRequest request,
                                                    final @RequestBody VolunteerRequestDTO volunteerRequestDTO) throws IllegalAccessException {
        Organization organization = (Organization) this.registeredUserService.getUserInformationAndIsRegistered(UserRole.ORGANIZATION, request);
        this.volunteerRequestService.updateVolunteerRequest(volunteerRequestDTO, idRequest, organization);
        return ResponseMessageUtil.createResponseSuccess("volunteer request updated", HttpStatus.OK, null);
    }

    /// Get all Organization Request by his name
    @GetMapping(value = "/all/expired/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> getAllExpiredVolunteerRequestOrganization(final HttpServletRequest request) throws RoleInfoNotFoundException, UnsupportedEncodingException, InterruptedException {
        String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.ORGANIZATION, request);
        List<VolunteerRequestSendDTO> volunteerRequestList = this.volunteerRequestService.getAllExpiredRequestByOrganizationEmail(email);
        return ResponseMessageUtil.createResponseSuccess("get all request by organization: " + email,
                HttpStatus.OK, volunteerRequestList);
    }

    /// Get all Organization Request by his name
    @GetMapping(value = "/all/active/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> getAllVolunteerRequestOrganization(final HttpServletRequest request) throws RoleInfoNotFoundException, UnsupportedEncodingException, InterruptedException {
        String email = registeredUserService.getUserEmailAndIsRegistered(UserRole.ORGANIZATION, request);
        List<VolunteerRequestSendDTO> volunteerRequestList = this.volunteerRequestService.getAllActiveRequestByOrganizationEmail(email);
        return ResponseMessageUtil.createResponseSuccess("get all request by organization: " + email,
                HttpStatus.OK, volunteerRequestList);
    }
}

package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestSendDTO;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.management.relation.RoleInfoNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/request/all/organization")
public class VolunteerRequestAllOrganizationController {

    private final VolunteerRequestService volunteerRequestService;
    private final RegisteredUserService registeredUserService;

    /// Get all Organization through its email-token
    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> getAllVolunteerRequestOrganization(final HttpServletRequest request) throws RoleInfoNotFoundException, UnsupportedEncodingException, InterruptedException {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.ORGANIZATION, request);
        List<VolunteerRequestSendDTO> volunteerRequestList = this.volunteerRequestService.getAllRequestByOrganizationEmail(email);
        return ResponseMessageUtil.createResponseSuccess("get all request by organization: "+email,
                HttpStatus.OK, volunteerRequestList);
    }

    /// Get all Organization Request by his name
    @GetMapping(value = "/{organizationName}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> getAllVolunteerRequestOrganization(final HttpServletRequest request,
                                                                final @PathVariable("organizationName") String organizationName) throws UnsupportedEncodingException, InterruptedException {
        this.registeredUserService.extractRoleFromRequest(request);
        List<VolunteerRequestSendDTO> volunteerRequestList = this.volunteerRequestService.getAllRequestByOrganizationName(organizationName);
        return ResponseMessageUtil.createResponseSuccess("get all request by organization: "+organizationName,
                HttpStatus.OK, volunteerRequestList);
    }



}

package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/request/all")
public class VolunteerRequestAllController {

    private final VolunteerRequestService volunteerRequestService;
    private final RegisteredUserService registeredUserService;


    @GetMapping(value = "/")
    public ResponseEntity<?> getVolunteerRequest(final HttpServletRequest request) throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer, request);
        List<VolunteerRequest> volunteerRequestSortedList = this.volunteerRequestService.getAllRequestSorted(email);
        ResponseMessage message = ResponseMessageUtil.createResponse("get all requests", HttpStatus.OK, volunteerRequestSortedList);
        return ResponseEntity.ok().body(message);
    }

    @GetMapping(value = "/organization/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllVolunteerRequestOrganization(final HttpServletRequest request) throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.organization, request);
        List<VolunteerRequest> volunteerRequestList = this.volunteerRequestService.getAllRequestByOrganizationEmail(email);
        ResponseMessage message = ResponseMessageUtil.createResponse("get all request by organization", HttpStatus.OK, volunteerRequestList);
        return ResponseEntity.ok().body(message);
    }
}

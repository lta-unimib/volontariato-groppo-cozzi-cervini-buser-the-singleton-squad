package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestSendDTO;
import com.unimib.singletonsquad.doit.security.JWTUtils;
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
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/request/all")
public class VolunteerRequestAllOrganizationController {

    private final VolunteerRequestService volunteerRequestService;
    private final RegisteredUserService registeredUserService;


    /// Get all Organization Request by his name
    @GetMapping(value = "/{organizationName}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllVolunteerRequestOrganization(final HttpServletRequest request,
                                                                final @PathVariable("organizationName") String organizationName) throws Exception {
        this.registeredUserService.checkRole(request);
        List<VolunteerRequestSendDTO> volunteerRequestList = this.volunteerRequestService.getAllRequestByOrganizationName(organizationName);
        //FIXME INSERIRLO IN UNA CLASSE APPOSITA E SOSTIUTIRLO PER TUTTE LE VOLTE
        ResponseMessage message = ResponseMessageUtil.createResponse("get all request by organization: "+organizationName,
                HttpStatus.OK, volunteerRequestList);
        return ResponseEntity.ok().body(message);
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllVolunteerRequestOrganization(final HttpServletRequest request) throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.organization, request);
        List<VolunteerRequestSendDTO> volunteerRequestList = this.volunteerRequestService.getAllRequestByOrganizationEmail(email);
        ResponseMessage message = ResponseMessageUtil.createResponse("get all request by organization: "+email,
                HttpStatus.OK, volunteerRequestList);
        return ResponseEntity.ok().body(message);
    }


}

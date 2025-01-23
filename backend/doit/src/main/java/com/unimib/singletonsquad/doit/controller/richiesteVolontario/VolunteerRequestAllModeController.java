package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestSendDTO;
import com.unimib.singletonsquad.doit.service.request.VolunteerRequestModeService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/request/all/volunteer")
public class VolunteerRequestAllModeController {

    private final RegisteredUserService registeredUserService;
    private final VolunteerRequestModeService volunteerRequestModeService;

    /// TODO FARLO IN UN SERVICE A PARTE
    /// FIXME: controllare e modificare
    @GetMapping(value = "/sorted/")
    public ResponseEntity<?> getVolunteerRequest(final HttpServletRequest request) throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer, request);
        List<VolunteerRequestSendDTO> volunteerRequestSortedList = this.volunteerRequestModeService.getAllRequestNotRegistered(email);
        return ResponseMessageUtil.createResponseSuccess("get all requests", HttpStatus.OK, volunteerRequestSortedList);
    }

    @GetMapping(value = "/registered/")
    public ResponseEntity<?> getRegisteredUser(final HttpServletRequest request) throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer, request);
        List<VolunteerRequestSendDTO> volunteerRequestSortedList = this.volunteerRequestModeService.getAllRequestRegistered(email);
        return ResponseMessageUtil.createResponseSuccess("get all requests", HttpStatus.OK, volunteerRequestSortedList);
    }

    @GetMapping(value = "/notvoted/")
    public ResponseEntity<?> getNotVotedUser(final HttpServletRequest request) throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer, request);
        List<VolunteerRequestSendDTO> volunteerRequestSortedList = this.volunteerRequestModeService.getAllRequestNotVoted(email);
        return ResponseMessageUtil.createResponseSuccess("get all requests", HttpStatus.OK, volunteerRequestSortedList);
    }

    @GetMapping(value = "/archived/")
    public ResponseEntity<?> getArchivedUser(final HttpServletRequest request) throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer, request);
        List<VolunteerRequestSendDTO> volunteerRequestSortedList = this.volunteerRequestModeService.getAllRequestVoted(email);
        return ResponseMessageUtil.createResponseSuccess("get all requests", HttpStatus.OK, volunteerRequestSortedList);
    }

}

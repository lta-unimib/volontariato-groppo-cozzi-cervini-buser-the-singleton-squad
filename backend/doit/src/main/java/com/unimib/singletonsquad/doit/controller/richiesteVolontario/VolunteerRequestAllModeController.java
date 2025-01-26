package com.unimib.singletonsquad.doit.controller.richiesteVolontario;

import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestSendDTO;
import com.unimib.singletonsquad.doit.service.request.VolunteerRequestModeService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.management.relation.RoleInfoNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/request/all/volunteer")
public class VolunteerRequestAllModeController {

    private final RegisteredUserService registeredUserService;
    private final VolunteerRequestModeService volunteerRequestModeService;


    @GetMapping(value = "/sorted/")
    public ResponseEntity<ResponseMessage> getVolunteerRequest(final HttpServletRequest request) throws UnsupportedEncodingException,
            InterruptedException, RoleInfoNotFoundException {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.VOLUNTEER, request);
        List<VolunteerRequestSendDTO> volunteerRequestSortedList = this.volunteerRequestModeService.getAllRequestNotRegistered(email);
        return ResponseMessageUtil.createResponseSuccess("get all requests sorted", HttpStatus.OK, volunteerRequestSortedList);
    }

    @GetMapping(value = "/registered/")
    public ResponseEntity<ResponseMessage> getRegisteredUser(final HttpServletRequest request) throws RoleInfoNotFoundException, UnsupportedEncodingException, InterruptedException {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.VOLUNTEER, request);
        List<VolunteerRequestSendDTO> volunteerRequestSortedList = this.volunteerRequestModeService.getAllRequestRegistered(email);
        return ResponseMessageUtil.createResponseSuccess("get all requests registered", HttpStatus.OK, volunteerRequestSortedList);
    }

    @GetMapping(value = "/notvoted/")
    public ResponseEntity<ResponseMessage> getNotVotedUser(final HttpServletRequest request) throws RoleInfoNotFoundException, UnsupportedEncodingException, InterruptedException {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.VOLUNTEER, request);
        List<VolunteerRequestSendDTO> volunteerRequestSortedList = this.volunteerRequestModeService.getAllRequestNotVoted(email);
        return ResponseMessageUtil.createResponseSuccess("get all requests notvoted", HttpStatus.OK, volunteerRequestSortedList);
    }

    @GetMapping(value = "/archived/")
    public ResponseEntity<ResponseMessage> getArchivedUser(final HttpServletRequest request) throws RoleInfoNotFoundException, UnsupportedEncodingException, InterruptedException {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.VOLUNTEER, request);
        List<VolunteerRequestSendDTO> volunteerRequestSortedList = this.volunteerRequestModeService.getAllRequestVoted(email);
        return ResponseMessageUtil.createResponseSuccess("get all requests archived", HttpStatus.OK, volunteerRequestSortedList);
    }

}

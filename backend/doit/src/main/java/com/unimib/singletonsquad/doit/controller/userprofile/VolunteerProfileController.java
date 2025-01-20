package com.unimib.singletonsquad.doit.controller.userprofile;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import com.unimib.singletonsquad.doit.service.profile.UserProfileService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.authentication.UserVerify;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/profile/volunteer")
public class VolunteerProfileController {

    private final UserProfileService userProfileService;
    private final UserVerify userVerify;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage getVolunteerInfo(final HttpServletRequest request)
            throws Exception{
        String email = this.userVerify.validateUserRoleFromToken(request, UserRole.volunteer);
        Volunteer vol = this.userProfileService.getVolunteerInfo(email);
        String messageResponse = String.format("getting info for %s", email);
        return ResponseMessageUtil.createResponse(messageResponse, HttpStatus.OK, vol);
    }

    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage updateVolunteerInfos(final HttpServletRequest request, final @RequestBody VolunteerDTO volunteer)
            throws Exception{
        String email = this.userVerify.validateUserRoleFromToken(request, UserRole.volunteer);
        this.userProfileService.updateVolunteerInfo(email, volunteer);
        String messageResponse = String.format("updated infos for %s", email);
        return ResponseMessageUtil.createResponse(messageResponse, HttpStatus.OK, null);
    }

    @DeleteMapping(value = "/")
    public ResponseMessage deleteVolunteer(final HttpServletRequest request){
        String email = this.userVerify.validateUserRoleFromToken(request, UserRole.volunteer);
        this.userProfileService.deleteVolunteer(email);
        String messageResponse = String.format("deleted user %s", email);
        return ResponseMessageUtil.createResponse(messageResponse, HttpStatus.OK, null);
    }

}

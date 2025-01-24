package com.unimib.singletonsquad.doit.controller.userprofile;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.received.VolunteerDTO;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
import com.unimib.singletonsquad.doit.service.user.UserProfileService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.RoleInfoNotFoundException;

@RestController
@RequestMapping("/profile/volunteer")
public class VolunteerProfileController  extends UserProfileController {


    private final UserProfileService userProfileService;
    private final RegisteredUserService registeredUserService;

    @Autowired
    public VolunteerProfileController(RegisteredUserService userVerify, UserProfileService userProfileService, RegisteredUserService registeredUserService) {
        super(userVerify);
        this.userProfileService = userProfileService;
        this.registeredUserService = registeredUserService;
    }


    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> getVolunteerInformation(final HttpServletRequest request) throws RoleInfoNotFoundException {
        Volunteer volunteer = (Volunteer) this.registeredUserService.getUserInformationAndIsRegistered(UserRole.VOLUNTEER, request);
        VolunteerDTO volunteerDTO = VolunteerMapper.toVolunteerDTO(volunteer);
        String messageResponse = String.format("getting info for %s", volunteerDTO.getEmail());
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, volunteerDTO);
    }

    /// UPDATE VOLUNTEER INFOS
    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> updateVolunteerInfos(final HttpServletRequest request,
                                                               final @RequestBody VolunteerDTO volunteer)
            throws RoleInfoNotFoundException {
        String email = validateTokenAndGetEmail(request, UserRole.VOLUNTEER);
        this.userProfileService.updateUserInfo(email, volunteer, UserRole.VOLUNTEER);
        String messageResponse = String.format("updated infos for %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }

    /// DELETE VOLUNTEER
    @DeleteMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> deleteUser(final HttpServletRequest request) throws RoleInfoNotFoundException {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.VOLUNTEER, request);
        this.userProfileService.deleteUser(email, UserRole.VOLUNTEER);
        String messageResponse = String.format("deleted user %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }

}

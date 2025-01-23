package com.unimib.singletonsquad.doit.controller.userprofile;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.recived.VolunteerDTO;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
import com.unimib.singletonsquad.doit.service.user.UserProfileService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/profile/volunteer")
public class VolunteerProfileController  extends UserProfileController {

    //FIXME === ASSOLUTAMENTE DA FIXARE ======
    private final UserProfileService userProfileService;
    private final RegisteredUserService registeredUserService;


    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage getVolunteerInformation(final HttpServletRequest request) throws Exception{
        String email = this.registeredUserService.getUserEmail(request);
        Volunteer volunteer = (Volunteer) this.userProfileService.getUserByEmail(email, UserRole.volunteer);
        VolunteerDTO volunteerDTO = VolunteerMapper.toVolunteerDTO(volunteer);
        String messageResponse = String.format("getting info for %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, volunteerDTO);
    }


    /// UPDATE VOLUNTEER INFOS
    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage updateVolunteerInfos(final HttpServletRequest request,
                                                final @RequestBody VolunteerDTO volunteer)
            throws Exception{
        String email = super.validateTokenAndGetEmail(request, UserRole.volunteer);;
        this.userProfileService.updateUserInfo(email, volunteer, UserRole.volunteer);
        String messageResponse = String.format("updated infos for %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }

    /// DELETE VOLUNTEER
    @DeleteMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage deleteUser(final HttpServletRequest request) throws Exception {
        String email = super.validateTokenAndGetEmail(request, UserRole.volunteer);
        this.userProfileService.deleteUser(email, UserRole.volunteer);
        String messageResponse = String.format("deleted user %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }

}

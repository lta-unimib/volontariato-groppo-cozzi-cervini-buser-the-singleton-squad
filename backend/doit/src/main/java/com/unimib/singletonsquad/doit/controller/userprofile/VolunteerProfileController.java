package com.unimib.singletonsquad.doit.controller.userProfile;

import com.unimib.singletonsquad.doit.controller.userProfile.UserProfileController;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/profile/volunteer")
public class VolunteerProfileController  extends UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public ResponseMessage getUser(final HttpServletRequest request)
            throws Exception{
        String email = super.validateTokenAndGetEmail(request, UserRole.volunteer);
        Volunteer vol = this.userProfileService.getVolunteerInfo(email);
        VolunteerDTO volunteerDTO = VolunteerMapper.toVolunteerDTO(vol);//TODO MOVE IN SERVICE
        String messageResponse = String.format("getting info for %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, volunteerDTO);    }

    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage updateVolunteerInfos(final HttpServletRequest request,
                                                final @RequestBody VolunteerDTO volunteer)
            throws Exception{
        String email = super.validateTokenAndGetEmail(request, UserRole.volunteer);;
        this.userProfileService.updateVolunteerInfo(email, volunteer);
        String messageResponse = String.format("updated infos for %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }

    @DeleteMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public ResponseMessage deleteUser(final HttpServletRequest request) throws Exception {
        String email = super.validateTokenAndGetEmail(request, UserRole.volunteer);
        this.userProfileService.deleteVolunteer(email);
        String messageResponse = String.format("deleted user %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }

}

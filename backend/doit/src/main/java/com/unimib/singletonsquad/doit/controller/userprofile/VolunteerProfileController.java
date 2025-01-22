package com.unimib.singletonsquad.doit.controller.userprofile;

import com.unimib.singletonsquad.doit.dto.recived.VolunteerDTO;
import com.unimib.singletonsquad.doit.service.profile.UserProfileService;
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

    private final UserProfileService userProfileService;

    /// GET VOLUNTEER INFORMATION
    @GetMapping(value = "/{idVolunteer}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage getVolunteerInformation(final HttpServletRequest request,
                                                   final @PathVariable("idVolunteer") Long idVolunteer)
            throws Exception{
        super.checkUserRequest(request);
        VolunteerDTO volunteerDTO = this.userProfileService.getVolunteerInfoById(idVolunteer);
        String messageResponse = String.format("getting info for %s", idVolunteer);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, volunteerDTO);
    }

    /// UPDATE VOLUNTEER INFOS
    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage updateVolunteerInfos(final HttpServletRequest request,
                                                final @RequestBody VolunteerDTO volunteer)
            throws Exception{
        String email = super.validateTokenAndGetEmail(request, UserRole.volunteer);;
        this.userProfileService.updateVolunteerInfo(email, volunteer);
        String messageResponse = String.format("updated infos for %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }

    /// DELETE VOLUNTEER
    @DeleteMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage deleteUser(final HttpServletRequest request) throws Exception {
        String email = super.validateTokenAndGetEmail(request, UserRole.volunteer);
        this.userProfileService.deleteVolunteer(email);
        String messageResponse = String.format("deleted user %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }

}

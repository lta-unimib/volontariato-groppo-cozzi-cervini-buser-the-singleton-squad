package com.unimib.singletonsquad.doit.controller.feedback;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.received.FeedbackDTO;
import com.unimib.singletonsquad.doit.service.feedback.FeedbackService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/feedback")
@RestController
@AllArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final RegisteredUserService registeredUserService;
    private static final UserRole organizationRole = UserRole.ORGANIZATION;
    private static final UserRole volunteerRole = UserRole.VOLUNTEER;

    /// L'organizzazione vota il volontario
    @PostMapping(value = "/volunteer/{idOffer}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> feedbackByOrganization(final @PathVariable("idOffer") Long idOffer,
                                                                  @RequestBody FeedbackDTO feedbackDTO,
                                                                  final HttpServletRequest request) throws IllegalAccessException {
        Organization organization = (Organization) this.registeredUserService.getUserInformationAndIsRegistered(organizationRole, request);
        this.feedbackService.setOrganizationVoteOffer(organization, idOffer,feedbackDTO.getEmail() ,feedbackDTO.getVote());
        return ResponseMessageUtil.createResponseSuccess("voted", HttpStatus.OK, null);
    }

    /// Il volontario vota un evento
    @PostMapping(value ="/organization/{idRequest}/")
    public ResponseEntity<ResponseMessage> feedBackByVolunteer(final HttpServletRequest request, final @Valid @RequestBody FeedbackDTO feedbackDTO,
                                                               final @PathVariable("idRequest") Long idRequest) throws IllegalAccessException {
       Volunteer volunteer = (Volunteer) this.registeredUserService.getUserInformationAndIsRegistered(volunteerRole, request);
       this.feedbackService.setVolunteerVoteRequest(volunteer,idRequest, feedbackDTO.getVote());
       return ResponseMessageUtil.createResponseSuccess("voted", HttpStatus.OK, null);
    }

    @PostMapping(value = "/{idRequest}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> feedback(final @PathVariable("idRequest") String idRequest,
                                                                  @RequestBody FeedbackDTO feedbackDTO,
                                                                  final HttpServletRequest request) throws IllegalAccessException {
        UserRole role = registeredUserService.extractRoleFromRequest(request);
        System.out.println("role: " + role);
        System.out.println(feedbackDTO.getVote());
        System.out.println(feedbackDTO.getEmail());
        System.out.println(idRequest);
        if(role == organizationRole) {
            Organization organization = (Organization) this.registeredUserService.getUserInformationAndIsRegistered(organizationRole, request);
            this.feedbackService.setOrganizationVoteOffer(organization, Long.parseLong(idRequest),feedbackDTO.getEmail() ,feedbackDTO.getVote());
            return ResponseMessageUtil.createResponseSuccess("voted", HttpStatus.OK, null);
        } else {
            Volunteer volunteer = (Volunteer) this.registeredUserService.getUserInformationAndIsRegistered(volunteerRole, request);
            this.feedbackService.setVolunteerVoteRequest(volunteer, Long.parseLong(idRequest), feedbackDTO.getVote());
            System.out.println("tutto ok");
            return ResponseMessageUtil.createResponseSuccess("voted", HttpStatus.OK, null);
        }
    }


}

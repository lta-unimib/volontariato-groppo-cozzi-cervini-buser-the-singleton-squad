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


    @PostMapping(value = "/{idRequest}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> feedback(
            final @PathVariable("idRequest") Long idRequest,
            @RequestBody FeedbackDTO feedbackDTO,
            final HttpServletRequest request) throws IllegalAccessException {

        UserRole role = registeredUserService.extractRoleFromRequest(request);

        return switch (role) {
            case ORGANIZATION -> {
                Organization organization = (Organization) registeredUserService
                        .getUserInformationAndIsRegistered(organizationRole, request);

                feedbackService.setOrganizationVoteOffer(
                        organization,
                        idRequest,
                        feedbackDTO.getEmail(),
                        feedbackDTO.getVote()
                );

                yield ResponseMessageUtil.createResponseSuccess("voted", HttpStatus.OK, null);
            }
            case VOLUNTEER -> {
                Volunteer volunteer = (Volunteer) registeredUserService
                        .getUserInformationAndIsRegistered(volunteerRole, request);

                feedbackService.setVolunteerVoteRequest(
                        volunteer,
                        idRequest,
                        feedbackDTO.getVote()
                );

                yield ResponseMessageUtil.createResponseSuccess("voted", HttpStatus.OK, null);
            }
            default -> throw new IllegalArgumentException("Invalid user role: " + role);
        };
    }


}

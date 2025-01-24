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

import javax.management.relation.RoleInfoNotFoundException;

@RequestMapping("/feedback")
@RestController
@AllArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final RegisteredUserService registeredUserService;
    private static final UserRole organizationRole = UserRole.ORGANIZATION;
    private static final UserRole volunteerRole = UserRole.VOLUNTEER;


    /// capire come passare il voto !!
    @PostMapping(value = "/organization/{idOffer}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> feedbackByOrganization(final @PathVariable("idOffer") Long idOffer, @RequestBody FeedbackDTO feedbackDTO,
                                                                  final HttpServletRequest request) throws RoleInfoNotFoundException {
        Organization organization = (Organization) this.registeredUserService.getUserInformationAndIsRegistered(organizationRole, request);
        System.out.println("Organization: " + organization);
        this.feedbackService.setOrganizationVoteOffer(organization, idOffer, feedbackDTO.getVote());
        return ResponseMessageUtil.createResponseSuccess("ok", HttpStatus.OK, null);
    }


    /// Endpoint che valuta l'evento richiesta --> capire come passare il voto
    @PostMapping(value ="/volunteer/{idRequest}/")
    public ResponseEntity<ResponseMessage> feedBackByVolunteer(final HttpServletRequest request, final @RequestBody FeedbackDTO feedbackDTO,
                                                               final @PathVariable("idRequest") Long idRequest) throws RoleInfoNotFoundException {
        Volunteer volunteer = (Volunteer) this.registeredUserService.getUserInformationAndIsRegistered(volunteerRole, request);
        this.feedbackService.setVolunteerVoteRequest(idRequest, volunteer, feedbackDTO.getVote());
        return ResponseMessageUtil.createResponseSuccess("ok", HttpStatus.OK, null);

    }
}

package com.unimib.singletonsquad.doit.controller.feedback;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    @GetMapping(value = "/organization/{idOffer}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> feedbackByOrganization(final @PathVariable("idOffer") Long idOffer,
                                                                  final HttpServletRequest request) throws RoleInfoNotFoundException {
        String organizationEmail = this.registeredUserService.getUserEmailAndIsRegistered(organizationRole, request);
        Organization organization = (Organization) this.registeredUserService.getUserInformations(organizationEmail, organizationRole);
        this.feedbackService.setOrganizationVoteOffer(organization, idOffer);
        return ResponseMessageUtil.createResponseSuccess("ok", HttpStatus.OK, null);
    }


    /// Endpoint che valuta l'evento richiesta --> capire come passare il voto
    @GetMapping(value ="/volunteer/{idRequest}/")
    public ResponseEntity<ResponseMessage> feedBackByVolunteer(final HttpServletRequest request,
                                                               final @PathVariable("idRequest") Long idRequest) throws RoleInfoNotFoundException {

        String volunteerEmail = this.registeredUserService.getUserEmailAndIsRegistered(volunteerRole,request);
        Volunteer volunteer = (Volunteer) this.registeredUserService.getUserInformations(volunteerEmail, volunteerRole);
        this.feedbackService.setVolunteerVoteRequest(idRequest, volunteer);
        return ResponseMessageUtil.createResponseSuccess("ok", HttpStatus.OK, null);

    }


}

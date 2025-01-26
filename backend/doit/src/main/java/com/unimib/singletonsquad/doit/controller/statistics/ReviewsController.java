package com.unimib.singletonsquad.doit.controller.statistics;

import com.google.gson.JsonObject;
import com.unimib.singletonsquad.doit.domain.organization.StatisticOrganization;
import com.unimib.singletonsquad.doit.domain.volunteer.StatisticVolunteer;
import com.unimib.singletonsquad.doit.service.statistic.StatisticOrganizationService;
import com.unimib.singletonsquad.doit.service.statistic.StatisticRequestService;
import com.unimib.singletonsquad.doit.service.statistic.StatisticVolunteerService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.management.relation.RoleInfoNotFoundException;

@RequestMapping("/reviews")
@RestController
@AllArgsConstructor
public class ReviewsController {
    private final RegisteredUserService registeredUserService;
    private final StatisticVolunteerService statisticVolunteerService;
    private final StatisticOrganizationService statisticOrganizationService;
    private final StatisticRequestService statisticRequestService;

    @GetMapping("/request/{requestId}/")
    public ResponseEntity<ResponseMessage> getRequestReviews(final HttpServletRequest request, @PathVariable Long requestId) throws RoleInfoNotFoundException {
        registeredUserService.extractRoleFromRequest(request);
        JsonObject data = statisticRequestService.getRequestStatistic(requestId);
        return ResponseMessageUtil.createResponseSuccess("getting request info", HttpStatus.OK, data);
    }

    @GetMapping("/volunteer/{volunteerEmail}/")
    public ResponseEntity<ResponseMessage> getVolunteerReviews(final HttpServletRequest request, @PathVariable String volunteerEmail) throws RoleInfoNotFoundException {
        registeredUserService.extractRoleFromRequest(request);
        StatisticVolunteer data = statisticVolunteerService.getVolunteerStatistic(volunteerEmail);
        return ResponseMessageUtil.createResponseSuccess("getting volunteer info", HttpStatus.OK, data);
    }

    @GetMapping("/organization/{organizationEmail}/")
    public ResponseEntity<ResponseMessage> getOrganizationReviews(final HttpServletRequest request, @PathVariable String organizationEmail) throws RoleInfoNotFoundException {
      registeredUserService.extractRoleFromRequest(request);
      StatisticOrganization data = statisticOrganizationService.getStatisticOrganization(organizationEmail);
      return ResponseMessageUtil.createResponseSuccess("getting organization info", HttpStatus.OK, data);
    }

    /*
    @GetMapping("request/{requestId}/volunteer/{volunteerId}")
    public ResponseEntity<ResponseMessage> getVolunteerReviewsByRequest(final HttpServletRequest request,@PathVariable String requestId, @PathVariable String volunteerId) throws RoleInfoNotFoundException {
        ResponseMessage responseMessage;
        responseMessage = new ResponseMessage.Builder("categories").data("").build();
        return ResponseEntity.ok(responseMessage);
    }
    @GetMapping("request/{requestId}/organization/{organizationId}")
    public ResponseEntity<ResponseMessage> getOrganizationReviewsByRequest(final HttpServletRequest request, @PathVariable String requestId, @PathVariable String organizationId) throws RoleInfoNotFoundException {
        ResponseMessage responseMessage;
        responseMessage = new ResponseMessage.Builder("categories").data("").build();
        return ResponseEntity.ok(responseMessage);
    }
    */
}

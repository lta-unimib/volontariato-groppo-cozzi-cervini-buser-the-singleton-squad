package com.unimib.singletonsquad.doit.controller.statistics;

import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
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
    @GetMapping("/request/{requestId}")
    public ResponseEntity<ResponseMessage> getRequestReviews(final HttpServletRequest request, @PathVariable Long requestId) throws RoleInfoNotFoundException {
        ResponseMessage responseMessage;
        responseMessage = new ResponseMessage.Builder("categories").data("").build();
        return ResponseEntity.ok(responseMessage);
    }
    @GetMapping("/volunteer/{volunteerId}")
    public ResponseEntity<ResponseMessage> getVolunteerReviews(final HttpServletRequest request, @PathVariable String volunteerId) throws RoleInfoNotFoundException {
        ResponseMessage responseMessage;
        responseMessage = new ResponseMessage.Builder("categories").data("").build();
        return ResponseEntity.ok(responseMessage);
    }
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
    @GetMapping("/organization/{organizationId}")
    public ResponseEntity<ResponseMessage> getOrganizationReviews(final HttpServletRequest request, @PathVariable String organizationId) throws RoleInfoNotFoundException {
        ResponseMessage responseMessage;
        responseMessage = new ResponseMessage.Builder("categories").data("").build();
        return ResponseEntity.ok(responseMessage);
    }
}

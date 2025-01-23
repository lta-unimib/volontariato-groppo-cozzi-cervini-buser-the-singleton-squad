package com.unimib.singletonsquad.doit.controller;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.dto.recived.OrganizationDTO;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/volunteer/favorite")
public class VolunteerFavouriteController {
    VolunteerDatabaseService volunteerDatabaseService;
    private final RegisteredUserService registeredUserService;

    @GetMapping("/organization/all/")
    public ResponseEntity<ResponseMessage> getFavouriteOrganizations(final HttpServletRequest request) throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer, request);
        List<OrganizationDTO> favouriteOrganizations = volunteerDatabaseService.getFavouriteOrganizations(email);
        ResponseMessage message = ResponseMessageUtil.createResponse( "getting all",HttpStatus.OK, favouriteOrganizations);
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/organization/")
    public ResponseEntity<?> deleteFavouriteOrganization(
            final HttpServletRequest request,
            @RequestBody(required = true) Map<String, String> body
    ) throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer, request);
        volunteerDatabaseService.revokeFavouriteOrganization(email, body.get("name"));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/organization/")
    public ResponseEntity<?> addFavouriteOrganization(
            final HttpServletRequest request,
            @RequestBody(required = true) Map<String, String> body
    ) throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.volunteer, request);
        volunteerDatabaseService.addFavouriteOrganization(email, body.get("name"));
        return ResponseEntity.ok().build();
    }
}

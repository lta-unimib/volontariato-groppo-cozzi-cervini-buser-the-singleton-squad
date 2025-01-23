package com.unimib.singletonsquad.doit.controller;

import com.unimib.singletonsquad.doit.dto.received.OrganizationDTO;
import com.unimib.singletonsquad.doit.service.favouriteOrganization.VolunteerFavouriteService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/volunteer/favorite")
public class VolunteerFavouriteController {
   private final VolunteerFavouriteService volunteerFavouriteService;
    private final RegisteredUserService registeredUserService;

    @GetMapping("/organizations/")
    public ResponseEntity<ResponseMessage> getFavouriteOrganizations(final HttpServletRequest request) throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.VOLUNTEER, request);
        List<OrganizationDTO> favouriteOrganizations = volunteerFavouriteService.getFavouriteOrganizations(email);
        return ResponseMessageUtil.createResponseSuccess( "getting all", HttpStatus.OK, favouriteOrganizations);
    }

    @DeleteMapping("/organization/{orgName}/")
    public ResponseEntity<ResponseMessage> deleteFavouriteOrganization(final HttpServletRequest request, @PathVariable(required = true) String orgName) throws Exception {
        orgName = URLDecoder.decode(orgName, StandardCharsets.UTF_8);
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.VOLUNTEER, request);
        volunteerFavouriteService.revokeFavouriteOrganization(email, orgName);
        return ResponseMessageUtil.createResponseSuccess( "deleted ",HttpStatus.OK, null);
    }

    @PostMapping("/organization/{orgName}/")
    public ResponseEntity<ResponseMessage> addFavouriteOrganization(final HttpServletRequest request, @PathVariable(required = true) String orgName) throws Exception {
        orgName = URLDecoder.decode(orgName, StandardCharsets.UTF_8);
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.VOLUNTEER, request);
        this.volunteerFavouriteService.addFavouriteOrganization(email, orgName);
        return ResponseMessageUtil.createResponseSuccess( "added ",HttpStatus.OK, null);
    }
}

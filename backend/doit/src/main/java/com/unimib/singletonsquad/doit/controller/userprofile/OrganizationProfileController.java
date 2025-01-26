package com.unimib.singletonsquad.doit.controller.userprofile;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.received.OrganizationDTO;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.service.user.UserProfileService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.RoleInfoNotFoundException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@RestController
@RequestMapping("/profile/organization")
public class OrganizationProfileController extends UserProfileController {

    private final UserProfileService userProfileService;
    private final RegisteredUserService registeredUserService;
    private static final UserRole userRole = UserRole.ORGANIZATION;

    @Autowired
    public OrganizationProfileController(RegisteredUserService userVerify, UserProfileService userProfileService, RegisteredUserService registeredUserService) {
        super(userVerify);
        this.userProfileService = userProfileService;
        this.registeredUserService = registeredUserService;
    }

    @GetMapping("/{nameOrganization}/")
    public ResponseEntity<ResponseMessage> getUserByName(final HttpServletRequest request, final @PathVariable("nameOrganization") String nameOrganization) throws UnsupportedEncodingException {
        this.registeredUserService.extractRoleFromRequest(request);
        String name = URLDecoder.decode(nameOrganization, "UTF-8");
        Organization organization = (Organization) this.userProfileService.getUserByName(name, userRole);
        String messageResponse = String.format("getting info for %s", name);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, OrganizationMapper.mapToOrganizationDTO(organization));
    }

    @GetMapping("/")
    public ResponseEntity<ResponseMessage> getOrganization(final HttpServletRequest request) throws RoleInfoNotFoundException {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(userRole, request);
        Organization organization = (Organization) this.userProfileService.getUserByEmail(email, userRole);
        return super.sendResponseMessage(String.format("getting info for %s", email), HttpStatus.OK, OrganizationMapper.mapToOrganizationDTO(organization));
    }

    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResponseMessage> updateUser(final HttpServletRequest request, final @RequestBody OrganizationDTO organizationDTO) throws RoleInfoNotFoundException {
        String email = validateTokenAndGetEmail(request, userRole);
        this.userProfileService.updateUserInfo(email, organizationDTO, userRole);
        String messageResponse = String.format("updated infos for %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }

    @DeleteMapping(value = "/")
    public ResponseEntity<ResponseMessage> deleteUser(final HttpServletRequest request) throws RoleInfoNotFoundException {
        String email = validateTokenAndGetEmail(request, userRole);
        this.userProfileService.deleteUser(email, userRole);
        String messageResponse = String.format("deleted user %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }
}

package com.unimib.singletonsquad.doit.controller.userprofile;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.recived.OrganizationDTO;
import com.unimib.singletonsquad.doit.exception.auth.InvalidRoleGeneralException;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import com.unimib.singletonsquad.doit.service.profile.UserProfileService;
import com.unimib.singletonsquad.doit.service.user.RegisteredUserService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;

@RestController
@AllArgsConstructor
@RequestMapping("/profile/organization")
public class OrganizationProfileController extends UserProfileController {

    private final UserProfileService userProfileService;
    private final RegisteredUserService registeredUserService;

    @GetMapping(value = "/{idOrganization}/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage getUser(final HttpServletRequest request, final @PathVariable("idOrganization") Long id) throws Exception{
        this.registeredUserService.checkRole(request);
        Organization organization = this.userProfileService.getOrganizationInfoById(id);
        String messageResponse = String.format("getting info for %s", id);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, OrganizationMapper.mapToOrganizationDTO(organization));
    }
    @GetMapping("/{nameOrganization}/")
    public ResponseMessage getUserByName(final HttpServletRequest request, final @PathVariable("nameOrganization") String nameOrganization) throws Exception{
        System.out.println("ok ok ok");
        this.registeredUserService.checkRole(request);
        String name = URLDecoder.decode(nameOrganization, "UTF-8");
        Organization organization = this.userProfileService.getOrganizationByName(name);
        String messageResponse = String.format("getting info for %s", name);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, OrganizationMapper.mapToOrganizationDTO(organization));
    }


    @GetMapping("/")
    public ResponseMessage getOrganization(final HttpServletRequest request) throws Exception {
        String email = this.registeredUserService.getUserEmailAndIsRegistered(UserRole.organization, request);
        Organization organization = this.userProfileService.getOrganizationByEmail(email);
        return super.sendResponseMessage(String.format("getting info for %s", email), HttpStatus.OK, OrganizationMapper.mapToOrganizationDTO(organization));
    }


    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage updateUser(final HttpServletRequest request, final @RequestBody OrganizationDTO organizationDTO) throws Exception{
        String email = super.validateTokenAndGetEmail(request, UserRole.organization);
        this.userProfileService.updateOrganizationInfo(email, organizationDTO);
        String messageResponse = String.format("updated infos for %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }

    @DeleteMapping(value = "/")
    public ResponseMessage deleteUser(final HttpServletRequest request) throws Exception {
        String email = super.validateTokenAndGetEmail(request, UserRole.organization);
        this.userProfileService.deleteOrganization(email);
        String messageResponse = String.format("deleted user %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }
}

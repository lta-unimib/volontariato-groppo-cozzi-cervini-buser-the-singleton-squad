package com.unimib.singletonsquad.doit.controller.userprofile;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.OrganizationDTO;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.service.profile.UserProfileService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/profile/organization")
public class OrganizationProfileController extends UserProfileController {

    private final UserProfileService userProfileService;


    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @Override
    public ResponseMessage getUser(final HttpServletRequest request) throws Exception{
        String email = super.validateTokenAndGetEmail(request, UserRole.organization);
        Organization organization = this.userProfileService.getOrganizationInfo(email);
        String messageResponse = String.format("getting info for %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, OrganizationMapper.mapToOrganizationDTO(organization));
    }

    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage updateUser(final HttpServletRequest request, final @RequestBody OrganizationDTO organizationDTO) throws Exception{
        String email = super.validateTokenAndGetEmail(request, UserRole.organization);
        this.userProfileService.updateOrganizationInfo(email, organizationDTO);
        String messageResponse = String.format("updated infos for %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }

    @DeleteMapping(value = "/")
    @Override
    public ResponseMessage deleteUser(final HttpServletRequest request) throws Exception {
        String email = super.validateTokenAndGetEmail(request, UserRole.organization);
        this.userProfileService.deleteOrganization(email);
        String messageResponse = String.format("deleted user %s", email);
        return super.sendResponseMessage(messageResponse, HttpStatus.OK, null);
    }
}

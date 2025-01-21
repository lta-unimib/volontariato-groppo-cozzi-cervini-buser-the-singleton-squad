package com.unimib.singletonsquad.doit.controller.userprofile;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.OrganizationDTO;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import com.unimib.singletonsquad.doit.exception.auth.InvalidRoleGeneralException;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.service.profile.UserProfileService;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import com.unimib.singletonsquad.doit.utils.authentication.UserVerify;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import io.netty.handler.codec.http2.Http2PushPromiseFrame;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/profile/organization")
public class OrganizationProfileController {

    private final UserProfileService userProfileService;
    private final UserVerify userVerify;


    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage getOrganizationInfo(final HttpServletRequest request) throws Exception{
        String email = this.userVerify.validateUserRoleFromToken(request, UserRole.organization);
        Organization organization = this.userProfileService.getOrganizationInfo(email);
        OrganizationDTO organizationDTO = OrganizationMapper.mapToOrganizationDTO(organization);
        String messageResponse = String.format("getting info for %s", email);
        return ResponseMessageUtil.createResponse(messageResponse, HttpStatus.OK, organizationDTO);
    }

    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage updateOrganizationInfo(final HttpServletRequest request, final @RequestBody OrganizationDTO organizationDTO) throws Exception{
        String email = this.userVerify.validateUserRoleFromToken(request, UserRole.organization);
        this.userProfileService.updateOrganizationInfo(email, organizationDTO);
        String messageResponse = String.format("updated infos for %s", email);
        return ResponseMessageUtil.createResponse(messageResponse, HttpStatus.OK, null);
    }

    @DeleteMapping(value = "/")
    public ResponseMessage deleteOrganization(final HttpServletRequest request){
        String email = this.userVerify.validateUserRoleFromToken(request, UserRole.organization);
        this.userProfileService.deleteOrganization(email);
        String messageResponse = String.format("deleted user %s", email);
        return ResponseMessageUtil.createResponse(messageResponse, HttpStatus.OK, null);
    }









}

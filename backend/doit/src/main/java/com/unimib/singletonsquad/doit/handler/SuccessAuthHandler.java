package com.unimib.singletonsquad.doit.handler;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationUserService;
import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import com.unimib.singletonsquad.doit.utils.response.ResponseUtils;
import com.unimib.singletonsquad.doit.utils.UserVerify;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import java.io.UnsupportedEncodingException;
import java.util.*;

@Component
public class SuccessAuthHandler implements AuthenticationSuccessHandler {

    private static final String SUCCESS_AUTH_URL = "/oauth/google/authentication/success";
    private static final String FAILURE_AUTH_URL = "/oauth/google/authentication/failure";
    private OAuth2User oauth2User;

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private AuthenticationUserService authUser;
    @Autowired
    private OrganizationService organizationService;
    @Autowired
    private OrganizationMapper organizationMapper;
    @Autowired
    private VolunteerMapper volunteerMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws UnsupportedEncodingException {

        if (response.isCommitted()) {
            return;
        }

        try {
            String stateParam = request.getParameter("state");
            System.out.println("[DEBUG] State parameter received: " + stateParam);

            String role = this.getRoleRequest(stateParam);

            if (role == null) {
                this.createResponseFailure(response, request, "role not valid");
                return;
            }

            OAuth2AuthenticationToken principal = validateAuthenticationType(authentication);

            if (principal == null) {
                this.createResponseFailure(response, request, "principal not valid");
                return;
            }

            this.oauth2User = principal.getPrincipal();

            OAuth2AuthorizedClient clientProvider = authorizedClientService.loadAuthorizedClient(
                    principal.getAuthorizedClientRegistrationId(),
                    principal.getName()
            );
            if (clientProvider == null || clientProvider.getAccessToken() == null) {;
                this.createResponseFailure(response, request, "client_provider null");
                return;
            }

            String userOauthEmail = this.oauth2User.getAttribute("email");

            Long userOauthId = this.checkOauthUserExists(userOauthEmail, role);

            boolean existsAlready = false;
            if (userOauthId != null) {
                this.authUserOauth(userOauthId, role, principal);
                existsAlready = true;
            } else {
                userOauthId = this.registerNewRecord(this.oauth2User, role);
                request.getSession().setAttribute("user_id", userOauthId);
                this.authUserOauth(userOauthId, role, principal);
            }

            this.createResponseSuccessRedirect(request, response, String.valueOf(existsAlready), role);

        } catch (Exception e) {
            e.printStackTrace();
            if (!response.isCommitted()) {
                this.createResponseFailure(response, request, e.getMessage());
            }
        }
    }

    private void createResponseSuccessRedirect(HttpServletRequest request,
                                               HttpServletResponse response,
                                               String existsAlready,
                                               String role) throws UnsupportedEncodingException {
        String url = SUCCESS_AUTH_URL+"?role="+role+"&isRegistered="+existsAlready;
        ResponseUtils.sendRedirect(response, url, request);
    }

    private void authUserOauth(Long userOauthId, String role, OAuth2AuthenticationToken principal) {
        this.authUser.setUpNewAuth(userOauthId, role, principal, this.oauth2User);
    }

    private Long checkOauthUserExists(String userOauthEmail, String role) {
        return this.getOauth2UserId(userOauthEmail, role);
    }

    private Long getOauth2UserId(String email, String role) {
        switch (role.toLowerCase()) {
            case "volunteer":
                Optional<Volunteer> volo = this.volunteerService.findVolunteerByEmail(email);
                return volo.isPresent() ? volo.get().getId() : null;

            case "organization":
                Optional<Organization> org = this.organizationService.findOrganizationByEmail(email);
                return org.isPresent() ? org.get().getId() : null;
            default:
                throw new IllegalArgumentException("Invalid role: " + role);
        }
    }

    private OAuth2AuthenticationToken validateAuthenticationType(Authentication authentication) {
        return (authentication instanceof OAuth2AuthenticationToken) ? (OAuth2AuthenticationToken) authentication : null;
    }

    private String getRoleRequest(String encodedState) {
        if (encodedState != null && encodedState.startsWith("role=")) {
            try {
                String encodedRole = encodedState.substring(5);
                byte[] decodedBytes = Base64.getDecoder().decode(encodedRole);
                String decodedRole = new String(decodedBytes);

                if (UserVerify.checkUserRole(decodedRole)) {
                    return decodedRole;
                }
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid role: " + encodedState);
            }
        }
        return null;
    }

    private Long registerNewRecord(OAuth2User user, String role) throws Exception {
        switch (role.toLowerCase()) {
            case "volunteer":
                return registerNewVolunteer(user);
            case "organization":
                return registerNewOrganizzazione(user);
            default:
                throw new IllegalArgumentException("registerNewRecord=> Unsupported role: " + role);
        }
    }

    private Long registerNewVolunteer(OAuth2User user) throws Exception {
        Volunteer volunteer = this.volunteerMapper.mapToVolunteer(user.getAttributes());
        if (volunteer != null) {
            Long id = this.volunteerService.save(volunteer).getId();
            return id;
        } else {
            throw new Exception("Error mapping OAuth2 user to Volunteer.");
        }
    }

    private Long registerNewOrganizzazione(OAuth2User user) throws Exception {
        Organization organization = this.organizationMapper.mapToOrganization(user.getAttributes());
        if (organization != null) {
            Long id = this.organizationService.save(organization).getId();
            return id;
        } else {
            throw new IllegalArgumentException("Error mapping OAuth2 user to Organization.");
        }
    }

    private void createResponseFailure(HttpServletResponse response, HttpServletRequest request, String message){
        String url = FAILURE_AUTH_URL +"?message="+message;
        ResponseUtils.sendRedirect(response, url, request);
    }
}
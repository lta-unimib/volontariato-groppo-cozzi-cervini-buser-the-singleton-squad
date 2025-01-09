package com.unimib.singletonsquad.doit.handler;

import com.unimib.singletonsquad.doit.domain.Organization;
import com.unimib.singletonsquad.doit.domain.ProfilePicture;
import com.unimib.singletonsquad.doit.domain.Volunteer;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationUserService;
import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import com.unimib.singletonsquad.doit.utils.FrontendUrls;
import com.unimib.singletonsquad.doit.utils.ResponseUtils;
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

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.*;

@Component
public class SuccessAuthHandler implements AuthenticationSuccessHandler {

    private static final String SUCCESS_AUTH_URL = "/oauth/google/authentication/success";
    private static final String FAILURE_AUTH_URL = "/oauth/google/authentication/error";
    private OAuth2User oauth2User;

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;
    @Autowired
    private VolunteerService volunteerService;
    @Autowired
    private AuthenticationUserService authUser;
    @Autowired
    private OrganizationService organizationService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws UnsupportedEncodingException {

        if (response.isCommitted()) {
            System.out.println("DEBUG: Response already committed, skipping further processing.");
            return;
        }

        try {
            // Recupero del ruolo dal parametro "state"
            String role = this.getRoleRequest(request.getParameter("state"));
            if (role == null) {
                ResponseUtils.sendFailureRedirect(request, response, "role not valid", this.generateUrlError());
                return;
            }

            OAuth2AuthenticationToken principal = validateAuthenticationType(authentication);
            if (principal == null) {
                ResponseUtils.sendFailureRedirect(request, response, "Unsupported authentication type.", this.generateUrlError());
                return;
            }

            this.oauth2User = principal.getPrincipal();
            OAuth2AuthorizedClient clientProvider = authorizedClientService.loadAuthorizedClient(
                    principal.getAuthorizedClientRegistrationId(),
                    principal.getName()
            );

            if (clientProvider == null || clientProvider.getAccessToken() == null) {
                ResponseUtils.sendFailureRedirect(request, response,
                        "Client provider or access token not found.", this.generateUrlError());
                return;
            }

            String userOauthEmail = this.oauth2User.getAttribute("email");
            Long userOauthId = this.checkOauthUserExists(userOauthEmail, role);
            boolean existsAlready = false;
            if (userOauthId != null) {
                this.authUserOauth(userOauthId, role, principal);
                existsAlready = true;
            } else {
                Long userId = this.registerNewRecord(this.oauth2User, role);
                this.authUserOauth(userId, role, principal);
            }

            // Redirect dopo il successo
            this.createResponseSuccessRedirect(request, response, existsAlready, role);

        } catch (Exception e) {
            System.out.println("DEBUG: Error during authentication: " + e.getMessage());
            e.printStackTrace();
            if (!response.isCommitted()) {
                ResponseUtils.sendFailureRedirect(request, response, e.getMessage(), this.generateUrlError());
            }
        }
    }

    private void createResponseSuccessRedirect(HttpServletRequest request,
                                               HttpServletResponse response,
                                               boolean existsAlready,
                                               String role) throws UnsupportedEncodingException {

        String next = this.getNextUrl(existsAlready, role);
        String url = SUCCESS_AUTH_URL + "?exists=" + existsAlready + "&next=" + URLEncoder.encode(next, "UTF-8");
        ResponseUtils.sendRedirect(response, url, request);
    }

    private String getNextUrl(boolean existsAlready, String role) {
        if (existsAlready)
            return FrontendUrls.SUCCESS_AUTH.getUrl()+"/"+role;
        else
            return FrontendUrls.FORM_URL.getUrl()+"/"+role;
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
        Volunteer volunteer = this.mapToVolunteer(user);
        if (volunteer != null) {
            return this.volunteerService.save(volunteer).getId();
        } else {
            throw new Exception("Error mapping OAuth2 user to Volunteer.");
        }
    }

    private Volunteer mapToVolunteer(OAuth2User user) throws Exception {
        Map<String, Object> userAttributes = user.getAttributes();
        Volunteer volunteer = new Volunteer();
        ProfilePicture profilePicture = new ProfilePicture();

        volunteer.setName((String) userAttributes.get("given_name"));
        volunteer.setSurname((String) userAttributes.get("family_name"));
        volunteer.setEmail((String) userAttributes.get("email"));
        profilePicture.setUrl((String) userAttributes.get("picture"));
        volunteer.setPhoneNumber((String) userAttributes.get("phoneNumber"));
        volunteer.setProfilePicture(profilePicture);

        return volunteer;
    }

    private Long registerNewOrganizzazione(OAuth2User user) throws Exception {
        Organization organization = this.mapToOrganization(user);
        if (organization != null) {
            return this.organizationService.save(organization).getId();
        } else {
            throw new IllegalArgumentException("Error mapping OAuth2 user to Organization.");
        }
    }

    private Organization mapToOrganization(OAuth2User user) throws Exception {
        Organization organization = new Organization();
        Map<String, Object> userAttributes = user.getAttributes();
        organization.setName(userAttributes.get("given_name") + "'s organization" + userAttributes.get("sub"));
        organization.setPhoneNumber((String) userAttributes.get("phoneNumber"));
        organization.setEmail((String) userAttributes.get("email"));
        return organization;
    }

    private String generateUrlError() throws UnsupportedEncodingException {
        return FAILURE_AUTH_URL + "?exists=false&next=" + URLEncoder.encode(ResponseUtils.frontendUrlBase + "/error", "UTF-8");
    }
}

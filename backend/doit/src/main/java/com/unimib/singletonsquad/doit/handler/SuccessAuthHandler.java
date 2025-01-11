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
import java.net.URLDecoder;
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
                                        Authentication authentication){

        if (response.isCommitted()) {
            return;
        }

        try {
            String stateParam = request.getParameter("state");

            Map<String, String> stateParams = parseState(stateParam);

            String role = stateParams.get("role");
            String uuid = new String(Base64.getDecoder().decode(stateParams.get("uuid")));

            System.out.println("debug: role => " + role);
            System.out.println("debug: uuid => " + uuid);

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

            if (userOauthId != null) {
                this.authUserOauth(userOauthId, role, principal);
                request.getSession().setAttribute("user_id", userOauthId);
            } else {
                userOauthId = this.registerNewRecord(this.oauth2User, role);
                System.out.println("debug: userOauthId _pi=> " + userOauthId);
                request.getSession().setAttribute("user_id", userOauthId);
                this.authUserOauth(userOauthId, role, principal);
            }
            System.out.println("debug: userOauthId => " + userOauthId);

            Boolean isRegistered = this.getIsRegisterUser(userOauthId, role);
            if(isRegistered == null)
                this.createResponseFailure(response, request, "user params not valid");

            this.createResponseSuccessRedirect(request, response, String.valueOf(isRegistered), uuid,role);

        } catch (Exception e) {
            e.printStackTrace();
            if (!response.isCommitted()) {
                this.createResponseFailure(response, request, e.getMessage());
            }
        }
    }

    private Boolean getIsRegisterUser(Long userOauthId, String role) {
        switch (role.toLowerCase()){
            case "volunteer":
                Optional<Volunteer> volunteer = this.volunteerService.findVolunteerById(userOauthId);
                return (volunteer.isPresent()) ? volunteer.get().isRegistered() : null;

            case "organization":
                Optional<Organization> organization = this.organizationService.findOrganizationById(userOauthId);
                return (organization.isPresent()) ? organization.get().isRegistered() : null;

            default:
                return null;
        }

    }
    private void createResponseSuccessRedirect(HttpServletRequest request,
                                               HttpServletResponse response,
                                               String existsAlready,
                                               String uuid,
                                               String role) {

        String url = String.format(SUCCESS_AUTH_URL+"?role=%s&isRegistered=%s&uuid=%s", role, existsAlready, uuid);
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

    private Map<String, String> parseState(String encodedState) {
        Map<String, String> result = new HashMap<>();

        if (encodedState != null) {
            try {
                // Assumi che lo state abbia il formato "state=role=...&uuid=..."
                String[] stateParts = encodedState.split("&");

                for (String part : stateParts) {
                    String[] keyValue = part.split("=", 2);
                    if (keyValue.length == 2) {
                        result.put(keyValue[0], keyValue[1]);
                    }
                }

                // Decodifica il ruolo se esiste
                if (result.containsKey("role")) {
                    String encodedRole = result.get("role");
                    byte[] decodedBytes = Base64.getDecoder().decode(encodedRole);
                    String decodedRole = new String(decodedBytes);

                    if (UserVerify.checkUserRole(decodedRole)) {
                        result.put("role", decodedRole);
                    } else {
                        throw new IllegalArgumentException("Invalid role detected");
                    }
                }

                // Assicura che `uuid` sia presente
                if (!result.containsKey("uuid")) {
                    throw new IllegalArgumentException("UUID is missing in state");
                }


            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid state format: " + encodedState, e);
            }
        }

        return result;
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
        if (volunteer != null)
            return this.volunteerService.save(volunteer).getId();
        else
            throw new Exception("Error mapping OAuth2 user to Volunteer.");
    }

    private Long registerNewOrganizzazione(OAuth2User user) throws Exception {
        Organization organization = this.organizationMapper.mapToOrganization(user.getAttributes());
        if (organization != null)
            return this.organizationService.save(organization).getId();
        else
            throw new IllegalArgumentException("Error mapping OAuth2 user to Organization.");

    }

    private void createResponseFailure(HttpServletResponse response, HttpServletRequest request, String message){
        String url = FAILURE_AUTH_URL +"?message="+message;
        ResponseUtils.sendRedirect(response, url, request);
    }
}
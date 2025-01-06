package com.unimib.singletonsquad.doit.handler;

import com.unimib.singletonsquad.doit.domain.Organization;
import com.unimib.singletonsquad.doit.domain.ProfilePicture;
import com.unimib.singletonsquad.doit.domain.Volunteer;
import com.unimib.singletonsquad.doit.service.authentication.AuthenticationUserService;
import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import com.unimib.singletonsquad.doit.service.database.VolunteerService;
import com.unimib.singletonsquad.doit.utils.ResponseUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.*;

@Component
public class SuccessAuthHandler implements AuthenticationSuccessHandler {

    private static final String SUCCESS_AUTH_URL = "/oauth/google/authentication/success";
    private static final String FAILURE_AUTH_URL = "/oauth/google/authentication/error";

    private final OAuth2AuthorizedClientService authorizedClientService;
    private OAuth2User oauth2User;
    private final VolunteerService volunteerService;
    private final AuthenticationUserService authUser;
    private final OrganizationService organizationService;

    public SuccessAuthHandler(OAuth2AuthorizedClientService authorizedClientService, VolunteerService volunteerService, AuthenticationUserService authUser, OrganizationService organizationService) {
        this.authorizedClientService = authorizedClientService;
        this.volunteerService = volunteerService;
        this.authUser = authUser;
        this.organizationService = organizationService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        if (response.isCommitted()) {
            System.out.println("DEBUG: Response already committed, skipping further processing.");
            return;
        }

        try {
            String role = this.getRoleRequest(request.getParameter("state"));
            if(role == null) {
                System.out.println("DEBUG: Invalid or missing state parameter.");
                ResponseUtils.sendFailureRedirect(request, response, "Invalid or missing state parameter.", FAILURE_AUTH_URL);
                return;
            }

            System.out.println("DEBUG: Role retrieved from state parameter: " + role);

            OAuth2AuthenticationToken principal = validateAuthenticationType(authentication);
            if (principal == null) {
                System.out.println("DEBUG: Unsupported authentication type.");
                ResponseUtils.sendFailureRedirect(request, response, "Unsupported authentication type.", FAILURE_AUTH_URL);
                return;
            }

            this.oauth2User = principal.getPrincipal();
            OAuth2AuthorizedClient clientProvider = authorizedClientService.loadAuthorizedClient(
                    principal.getAuthorizedClientRegistrationId(),
                    principal.getName()
            );

            if (clientProvider == null || clientProvider.getAccessToken() == null) {
                System.out.println("DEBUG: Client provider or access token not found.");
                ResponseUtils.sendFailureRedirect(request, response, "Client provider or access token not found.", FAILURE_AUTH_URL);
                return;
            }

            // Stampa dei dettagli dell'utente OAuth
            System.out.println("DEBUG: OAuth2 User: " + oauth2User.getName());
            System.out.println("DEBUG: OAuth2 Email: " + oauth2User.getAttribute("email"));

            String userOauthEmail = this.oauth2User.getAttribute("email");
            Long userOauthId = this.checkOauthUserExists(userOauthEmail, role);

            if(userOauthId != null) {
                // l'utente esiste già nel database
                System.out.println("DEBUG: User exists in database, userId: " + userOauthId);
                this.authUserOauth(userOauthId, role, principal);
            } else {
                Long userId = this.registerNewRecord(this.oauth2User, role);
                this.authUserOauth(userId, role, principal);
            }

            //todo aggiungere nella sessione/funzione apposita il token JWT per restituirlo
            ResponseUtils.sendRedirect(response, SUCCESS_AUTH_URL, request);

        } catch (Exception e) {
            System.out.println("DEBUG: Error during authentication: " + e.getMessage());
            e.printStackTrace();  // Aggiungi la stampa dello stack trace per ottenere più dettagli
            ResponseUtils.sendFailureRedirect(request, response, e.getMessage(), FAILURE_AUTH_URL);
        }
    }

    private void authUserOauth(Long userOauthId, String role, OAuth2AuthenticationToken principal) {
        System.out.println("DEBUG: Setting up new authentication for user with ID: " + userOauthId + " and role: " + role);
        this.authUser.setUpNewAuth(userOauthId, role, principal, this.oauth2User);
    }

    private Long checkOauthUserExists(String userOauthEmail, String role) {
        return this.getOauth2UserId(userOauthEmail, role);

    }

    private Long getOauth2UserId(String email, String role) {
        switch (role.toLowerCase()){
            case "volontario":
                Optional<Volunteer> volo = this.volunteerService.findVolunteerByEmail(email);
                return volo.isPresent() ? volo.get().getId() : null;

            case "organizzazione":
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
        System.out.println("DEBUG: Decoding state parameter to get role.");
        if (encodedState != null && encodedState.startsWith("role=")) {
            try {
                String encodedRole = encodedState.substring(5);
                byte[] decodedBytes = Base64.getDecoder().decode(encodedRole);
                String decodedRole = new String(decodedBytes);
                System.out.println("DEBUG: Decoded role: " + decodedRole);

                if (decodedRole.equalsIgnoreCase("volontario") || decodedRole.equalsIgnoreCase("organizzazione")) {
                    return decodedRole;
                }
            } catch (IllegalArgumentException e) {
                System.out.println("DEBUG: Invalid Base64 encoding for state parameter.");
            }
        }
        return null;
    }

    private Long registerNewRecord(OAuth2User user, String role) throws Exception {
        return switch (role.toLowerCase()) {
            case "volontario" -> registerNewVolunteer(user);
            case "organizzazione" -> registerNewOrganizzazione(user);
            default ->  throw new IllegalArgumentException("registerNewRecord=> Unsupported role: " + role);
        };
    }


    private Long registerNewVolunteer(OAuth2User user) throws Exception {
        Volunteer volunteer = this.mapToVolunteer(user);
        if (volunteer != null)
            return this.volunteerService.save(volunteer).getId();
        else
            throw new Exception("Error mapping OAuth2 user to Volunteer.");

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
        if (organization != null)
            return this.organizationService.save(organization).getId();
        else
            throw new Exception("Error mapping OAuth2 user to Organization.");
    }

    private Organization mapToOrganization(OAuth2User user) throws Exception {
        Organization organization = new Organization();
        Map<String, Object> userAttributes = user.getAttributes();
        organization.setName((String) userAttributes.get("given_name") + "'s organization");
        organization.setPhoneNumber((String) userAttributes.get("phoneNumber"));
        organization.setEmail((String) userAttributes.get("email"));

        return organization;
    }




}

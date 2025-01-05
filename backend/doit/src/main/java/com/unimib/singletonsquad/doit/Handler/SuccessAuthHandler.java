package com.unimib.singletonsquad.doit.Handler;

import com.unimib.singletonsquad.doit.Domain.ProfilePicture;
import com.unimib.singletonsquad.doit.Domain.Volunteer;
import com.unimib.singletonsquad.doit.Service.Authentication.AuthenticationUser;
import com.unimib.singletonsquad.doit.Service.VolunteerService;
import com.unimib.singletonsquad.doit.Utils.ResponseUtils;
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
    private final AuthenticationUser authUser;

    public SuccessAuthHandler(OAuth2AuthorizedClientService authorizedClientService, VolunteerService volunteerService, AuthenticationUser authUser) {
        this.authorizedClientService = authorizedClientService;
        this.volunteerService = volunteerService;
        this.authUser = authUser;
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
                // Nuovo utente
                System.out.println("DEBUG: User does not exist, registering new user.");
                Long userId = this.registerNewRecord(this.oauth2User, role);
                this.authUserOauth(userId, role, principal);
            }

            //todo aggiungere nella sessione il token JWT per restituirlo
            ResponseUtils.sendSuccessRedirect(request, response, SUCCESS_AUTH_URL);

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
        System.out.println("DEBUG: Checking if OAuth user exists for email: " + userOauthEmail + " with role: " + role);
        if(role.equalsIgnoreCase("volontario")) {
            return this.getOauth2UserId(userOauthEmail);
        }
        //todo per organizzazione
        return null;
    }

    private Long getOauth2UserId(String email) {
        System.out.println("DEBUG: Fetching volunteer by email: " + email);
        Optional<Volunteer> volo = this.volunteerService.findVolunteerByEmail(email);
        if (volo.isPresent()) {
            System.out.println("DEBUG: Volunteer found with ID: " + volo.get().getId());
            return volo.get().getId();
        } else {
            System.out.println("DEBUG: Volunteer not found.");
            return null;
        }
    }

    private OAuth2AuthenticationToken validateAuthenticationType(Authentication authentication) {
        System.out.println("DEBUG: Validating authentication type.");
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
        System.out.println("DEBUG: Registering new record for user with role: " + role);
        if(role.equalsIgnoreCase("volontario")) {
            return registerNewVolunteer(user);
        } else if (role.equalsIgnoreCase("organizzazione")) {
            return registerNewOrganizzazione(user);
        } else {
            System.out.println("DEBUG: Unsupported role: " + role);
            throw new Exception("Unsupported role: " + role);
        }
    }

    private Long registerNewVolunteer(OAuth2User user) throws Exception {
        System.out.println("DEBUG: Registering new volunteer.");
        Volunteer volunteer = this.mapToVolunteer(user);
        if (volunteer != null) {
            Volunteer volo = this.volunteerService.save(volunteer);
            System.out.println("DEBUG: Volunteer registered with ID: " + volo.getId());
            return volo.getId();
        } else {
            System.out.println("DEBUG: Error mapping OAuth2 user to Volunteer.");
            return null;
        }
    }

    private Volunteer mapToVolunteer(OAuth2User user) throws Exception {
        Map<String, Object> userAttributes = user.getAttributes();
            Volunteer volunteer = new Volunteer();
            ProfilePicture volunteerPicture = new ProfilePicture();
            volunteer.setName((String) userAttributes.get("given_name"));
            volunteer.setSurname((String) userAttributes.get("family_name"));
            volunteer.setEmail((String) userAttributes.get("email"));
            volunteerPicture.setUrl((String) userAttributes.get("picture"));
            volunteer.setPhoneNumber((String) userAttributes.get("phoneNumber"));
            System.out.println("debug: Volunteer attributes: " + userAttributes);
            volunteer.setProfilePicture(volunteerPicture);

            System.out.println("DEBUG: Mapped volunteer: " + volunteer);
            return volunteer;
    }

    private Long registerNewOrganizzazione(OAuth2User user){
        // Logic for registering a new organization
        return null;
    }

}

package com.unimib.singletonsquad.doit.Handler;

import com.unimib.singletonsquad.doit.Security.CustomOAuth2User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Base64;
import java.util.Collections;
import java.util.UUID;

@Component
public class SuccessAuthHandler implements AuthenticationSuccessHandler {

    private static final String SUCCESS_AUTH_URL = "/oauth/google/authentication/success";
    private static final String FAILURE_AUTH_URL = "/oauth/google/authentication/error";

    private final OAuth2AuthorizedClientService authorizedClientService;

    public SuccessAuthHandler(OAuth2AuthorizedClientService authorizedClientService) {
        this.authorizedClientService = authorizedClientService;
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
            // Verifica il parametro "state" e il ruolo
            String role = this.getRoleRequest(request.getParameter("state"));
            if (role == null) {
                sendFailureRedirect(request, response, "Invalid or missing state parameter.");
                return;
            }

            // Valida il tipo di autenticazione
            OAuth2AuthenticationToken principal = validateAuthenticationType(authentication);
            if (principal == null) {
                sendFailureRedirect(request, response, "Unsupported authentication type.");
                return;
            }

            // Recupera l'utente e il token OAuth2
            OAuth2User oauth2User = principal.getPrincipal();
            OAuth2AuthorizedClient clientProvider = authorizedClientService.loadAuthorizedClient(
                    principal.getAuthorizedClientRegistrationId(),
                    principal.getName()
            );

            if (clientProvider == null || clientProvider.getAccessToken() == null) {
                sendFailureRedirect(request, response, "Client provider or access token not found.");
                return;
            }

            // Gestisci l'autenticazione e salva i dettagli
            OAuth2AccessToken token = clientProvider.getAccessToken();
            UUID uuid = UUID.randomUUID();
            request.getSession().setAttribute("uuid", uuid.toString());

            setNewAuthentication(oauth2User, principal, uuid);
            storeOAuthInfoInSession(request, oauth2User, token);
            setUserWebDetails(request, principal);

            // Redirect interno verso la pagina di successo
            sendSuccessRedirect(request, response);

        } catch (Exception e) {
            System.out.println("DEBUG: Error during authentication: " + e.getMessage());
            sendFailureRedirect(request, response, e.getMessage());
        }
    }

    private OAuth2AuthenticationToken validateAuthenticationType(Authentication authentication) {
        return (authentication instanceof OAuth2AuthenticationToken) ? (OAuth2AuthenticationToken) authentication : null;
    }

    private void sendSuccessRedirect(HttpServletRequest request, HttpServletResponse response){
        try {
            if (!response.isCommitted()) {
                request.getRequestDispatcher(SUCCESS_AUTH_URL).forward(request, response);
            } else {
                System.out.println("DEBUG: Response already committed, cannot forward to success URL.");
            }
        } catch (Exception e) {
            System.out.println("DEBUG: Error forwarding to success URL: " + e.getMessage());
            sendFailureRedirect(request, response, "Error forwarding to success page.");
        }
    }

    private void sendFailureRedirect(HttpServletRequest request, HttpServletResponse response, String message){
        try {
            if (!response.isCommitted()) {
                request.setAttribute("errorMessage", message);
                request.getRequestDispatcher(FAILURE_AUTH_URL).forward(request, response);
            } else {
                System.out.println("DEBUG: Response already committed, cannot forward to failure URL.");
            }
        } catch (Exception e) {
            System.out.println("DEBUG: Error forwarding to failure URL: " + e.getMessage());
            throw new InternalSecurityException(e.getMessage(), request.getRequestURI());
        }
    }

    private void setNewAuthentication(OAuth2User oauth2User, OAuth2AuthenticationToken principal, UUID uuid) {
        CustomOAuth2User newAuthUser = new CustomOAuth2User(oauth2User, uuid);

        Authentication newAuth = new OAuth2AuthenticationToken(
                newAuthUser,
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                principal.getAuthorizedClientRegistrationId()
        );

        SecurityContextHolder.getContext().setAuthentication(newAuth);
    }

    private void storeOAuthInfoInSession(HttpServletRequest request, OAuth2User oauth2User, OAuth2AccessToken token) {
        HttpSession session = request.getSession();
        session.setAttribute("oauth2User", oauth2User);
        session.setAttribute("oauth2User_access_token", token.getTokenValue());
        session.setAttribute("oauth2User_sub", oauth2User.getAttribute("sub"));
    }

    private void setUserWebDetails(HttpServletRequest request, OAuth2AuthenticationToken principal) {
        HttpSession session = request.getSession();
        session.setAttribute("oauth_ip", request.getRemoteAddr());
        session.setAttribute("oauth_sessionID", session.getId());
    }

    private String getRoleRequest(String encodedState) {
        if (encodedState != null && encodedState.startsWith("role=")) {
            try {
                String encodedRole = encodedState.substring(5);
                byte[] decodedBytes = Base64.getDecoder().decode(encodedRole);
                String decodedRole = new String(decodedBytes);

                if (decodedRole.equalsIgnoreCase("volontario") ||
                        decodedRole.equalsIgnoreCase("organizzazione")) {
                    return decodedRole;
                }
            } catch (IllegalArgumentException e) {
                System.out.println("DEBUG: Invalid Base64 encoding for state parameter.");
            }
        }
        return null;
    }
}

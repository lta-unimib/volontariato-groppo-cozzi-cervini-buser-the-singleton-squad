package com.unimib.singletonsquad.doit.handler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;

@Component
public class FailureAuthHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        String url = "/oauth/google/authentication/failure?exists=false&next="+ URLEncoder.encode("http://localhost:3000/error", "UTF-8");
        response.sendRedirect(url);
    }
}

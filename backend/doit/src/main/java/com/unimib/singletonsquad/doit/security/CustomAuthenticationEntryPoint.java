package com.unimib.singletonsquad.doit.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unimib.singletonsquad.doit.exception.auth.AuthException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {

        if (authException instanceof AuthException) {
            AuthException customEx = (AuthException) authException;

            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("timestamp", new Date());
            errorResponse.put("status", HttpServletResponse.SC_UNAUTHORIZED);
            errorResponse.put("error", "UNAUTHORIZED");
            errorResponse.put("message", customEx.getMessage());
            errorResponse.put("path", customEx.getPath());

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));

        } else {
            // Risposta generica per altre eccezioni
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("timestamp", new Date());
            errorResponse.put("status", HttpServletResponse.SC_UNAUTHORIZED);
            errorResponse.put("error", "UNAUTHORIZED");
            errorResponse.put("message", "Authentication failed");
            errorResponse.put("path", request.getRequestURI());

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
        }
    }

}

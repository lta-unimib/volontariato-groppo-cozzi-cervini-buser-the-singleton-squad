package com.unimib.singletonsquad.doit.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unimib.singletonsquad.doit.exception.AuthException;
import com.unimib.singletonsquad.doit.exception.ExceptionResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.util.List;
import java.io.IOException;
import java.util.Arrays;
import java.util.Date;

@Component
public class AuthFilter extends OncePerRequestFilter {
    private final JWTUtils jwtUtils;
    private final ObjectMapper objectMapper;

    private static final List<String> PUBLIC_PATHS = Arrays.asList(
            "/oauth/google/authentication/success",
            "/oauth/google/authentication/error",
            "/oauth/google/authentication/failure",
            "/login/oauth2/google",
            "/login/oauth2/code/google",
            "/authentication/**",
            "/favicon.ico",
            "/error"
    );

    public AuthFilter(JWTUtils jwtUtils, ObjectMapper objectMapper) {
        this.jwtUtils = jwtUtils;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws IOException {
        String path = request.getRequestURI();
        System.out.println("Debug: "+path);
        try {
            if (!isPublicPath(path)) {
                authenticateRequest(request);
            }
            filterChain.doFilter(request, response);
        } catch (AuthException ex) {
            handleAuthenticationError(response, ex, path);
        } catch (Exception ex) {
            handleGenericError(response, ex, path);
        }
    }

    private void authenticateRequest(HttpServletRequest request) {
        String authHeader = extractAuthHeader(request);
        String token = extractToken(authHeader, request);
        validateToken(token, request);
        setAuthentication(token);
    }

    private String extractAuthHeader(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("No Bearer token found in request");
            throw new AuthException("Invalid or missing authorization header", request.getRequestURI());
        }
        return authHeader;
    }

    private String extractToken(String authHeader, HttpServletRequest request) {
        return authHeader.substring(7);
    }

    private void validateToken(String token, HttpServletRequest request) {
        if (!jwtUtils.verifyToken(token)) {
            throw new AuthException("Invalid token signature", request.getRequestURI());
        }
        if (jwtUtils.isExpired(token)) {
            throw new AuthException("Token has expired", request.getRequestURI());
        }
        System.out.println("Token: "+token);
        request.getSession().setAttribute("token", token);
    }

    private void setAuthentication(String token) {
        SecurityContextHolder.getContext().setAuthentication(jwtUtils.getAuthentication(token));
    }

    private void handleAuthenticationError(HttpServletResponse response, AuthException ex, String path) throws IOException {
        ExceptionResponse errorResponse = new ExceptionResponse(
                new Date(),
                ex.getMessage(),
                "Authentication failed for path: " + path,
                HttpServletResponse.SC_UNAUTHORIZED
        );
        sendErrorResponse(response, errorResponse);
    }

    private void handleGenericError(HttpServletResponse response, Exception ex, String path) throws IOException {
        ExceptionResponse errorResponse = new ExceptionResponse(
                new Date(),
                "Internal server error",
                "Error processing request for path: " + path,
                HttpServletResponse.SC_INTERNAL_SERVER_ERROR
        );
        sendErrorResponse(response, errorResponse);
    }

    private void sendErrorResponse(HttpServletResponse response, ExceptionResponse errorResponse) throws IOException {
        response.setStatus(errorResponse.getStatus());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        objectMapper.writeValue(response.getWriter(), errorResponse);
    }

    private boolean isPublicPath(String uri) {
        return PUBLIC_PATHS.stream().anyMatch(pattern -> {
            if (pattern.endsWith("/**")) {
                String prefix = pattern.substring(0, pattern.length() - 2);
                return uri.startsWith(prefix);
            }
            return uri.equals(pattern);
        });
    }
}
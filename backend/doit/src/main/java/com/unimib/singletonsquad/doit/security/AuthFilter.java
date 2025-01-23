package com.unimib.singletonsquad.doit.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unimib.singletonsquad.doit.exception.auth.AuthException;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessage;
import com.unimib.singletonsquad.doit.utils.common.ResponseMessageUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
public class AuthFilter extends OncePerRequestFilter {
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private ObjectMapper objectMapper;


    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws IOException {
        String path = request.getRequestURI();

        try {
            boolean isPublic = isPublicPath(path);

            if (!isPublic) {
                authenticateRequest(request);
            }

            filterChain.doFilter(request, response);

        } catch (AuthException ex) {
            handleAuthenticationError(response, ex);
        } catch (Exception ex) {
            handleGenericError(response, ex);
        }
    }

    private void authenticateRequest(HttpServletRequest request) {
        String authHeader = extractAuthHeader(request);
        String token = extractToken(authHeader);
        validateToken(token, request);
        setAuthentication(token);
    }

    private String extractAuthHeader(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            throw new AuthException("Invalid or missing authorization header", HttpStatus.UNAUTHORIZED);

        return authHeader;
    }

    private String extractToken(String authHeader) {
        return authHeader.substring(7);
    }

    private void validateToken(String token, HttpServletRequest request) {
        boolean isValidSignature = jwtUtils.verifyToken(token);

        if (!isValidSignature)
            throw new AuthException("Invalid token signature",HttpStatus.UNAUTHORIZED);

        boolean isExpired = jwtUtils.isExpired(token);
        if (isExpired)
            throw new AuthException("Token has expired", HttpStatus.UNAUTHORIZED);

        request.getSession().setAttribute("token", token);
    }

    private void setAuthentication(String token) {
        SecurityContextHolder.getContext().setAuthentication(jwtUtils.getAuthentication(token));
    }

    private void handleAuthenticationError(HttpServletResponse response,
                                           AuthException ex) throws IOException {
        sendErrorResponse(response, ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    private void handleGenericError(HttpServletResponse response,
                                    Exception ex) throws IOException {
        sendErrorResponse(response, ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    private void sendErrorResponse(HttpServletResponse response, String message, HttpStatus status) throws IOException {
        ResponseMessage errorResponse = ResponseMessageUtil.createResponseSuccess(message, status, null);
        response.setStatus(errorResponse.getStatus().value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        objectMapper.writeValue(response.getWriter(), errorResponse);
    }

    private boolean isPublicPath(String uri) {
        return Arrays.stream(PublicPaths.values())
                .anyMatch(publicPath -> publicPath.matches(uri));
    }

}

package com.unimib.singletonsquad.doit.Security;


import com.unimib.singletonsquad.doit.Exception.AuthException;
import com.unimib.singletonsquad.doit.Exception.CustomSecurityException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthFilter extends OncePerRequestFilter{

    private final JWTUtils jwtUtils;

    public AuthFilter(JWTUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws  IOException, ServletException {
        try {
            String path = request.getRequestURI();
            if (path.startsWith("/authentication/") || path.startsWith("/oauth/")) {
                filterChain.doFilter(request, response);
                return;
            }


            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer "))
                throw new AuthException("Needed to be authorized", request.getRequestURI());

            String token = authHeader.substring(7);

            if (!this.jwtUtils.verifyToken(token) || this.jwtUtils.isExpired(token))
                throw new AuthException("AuthToken not valid", request.getRequestURI());

            if(this.jwtUtils.verifyToken(token) && !this.jwtUtils.isExpired(token)){
                System.out.println("token valid");
                return;
            }

            filterChain.doFilter(request, response);
        } catch (AuthException ex) {
            throw new AuthException(ex.getMessage(), ex.getPath());
        }
    }









}
package com.unimib.singletonsquad.doit.Security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.*;

@Component
public class CustomBearerTokenFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";
    private static final List<String> PUBLIC_PATHS = Arrays.asList(
            "/authentication/**",
            "/oauth/**",
            "/public/**"
    );
    private JWTUtils jwtUtils;

    public CustomBearerTokenFilter() {
        this.jwtUtils = new JWTUtils();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        if (this.isPublicPath(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = this.getAuthHeader(request);

        if (authHeader != null && authHeader.startsWith(BEARER_PREFIX)) {
            String token = authHeader.substring(BEARER_PREFIX.length());

            if (this.validateBearerToken(token)) {
                //todo non c'è un modo per saltare OAUTH2 senza rompere la catena?
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private boolean validateBearerToken(String bearerToken) {
        return this.jwtUtils.verifyToken(bearerToken) && !this.jwtUtils.isExpired(bearerToken);
    }

    private String getAuthHeader(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    private boolean isPublicPath(String uri) {
        return PUBLIC_PATHS.stream().anyMatch(path -> uri.matches(path.replace("**", ".*")));
    }
}

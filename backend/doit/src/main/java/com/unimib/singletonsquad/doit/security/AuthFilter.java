package com.unimib.singletonsquad.doit.security;
import com.unimib.singletonsquad.doit.exception.AuthException;
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

@Component
public class AuthFilter extends OncePerRequestFilter{

    private final JWTUtils jwtUtils;
    private static final List<String> PUBLIC_PATHS = Arrays.asList(
            "/oauth/google/authentication/success",
            "/oauth/google/authentication/error",
            "/oauth/google/authentication/failure",
            "/login/oauth2/google",
            "/login/oauth2/code/google",
            "/authentication/**",
            "/favicon.ico"
            );

    public AuthFilter(JWTUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws  IOException, ServletException {

        boolean publicPath = false;


        String path = request.getRequestURI();
        System.out.println(path);
        if(isPublicPath(path)) {
            publicPath = true;
        }
        try {

            String authHeader = request.getHeader("Authorization");
            if(!publicPath){
                if (authHeader == null || !authHeader.startsWith("Bearer ") )
                    throw new AuthException("Needed to be authorized", request.getRequestURI());

                String token = authHeader.substring(7);

                if (!this.jwtUtils.verifyToken(token) || this.jwtUtils.isExpired(token))
                    throw new AuthException("AuthToken not valid", request.getRequestURI());

                if(this.jwtUtils.verifyToken(token) && !this.jwtUtils.isExpired(token)){
                    System.out.println("token valid");
                    SecurityContextHolder.getContext().setAuthentication(jwtUtils.getAuthentication(token));
                }
            }
            filterChain.doFilter(request, response);
        } catch (AuthException ex) {
            throw new AuthException(ex.getMessage(), ex.getPath());
        }
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
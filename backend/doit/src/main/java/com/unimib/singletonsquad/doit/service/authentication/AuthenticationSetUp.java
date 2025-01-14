package com.unimib.singletonsquad.doit.service.authentication;

import com.unimib.singletonsquad.doit.security.CustomOAuth2User;
import com.unimib.singletonsquad.doit.security.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
@Component
public class AuthenticationSetUp {

    @Autowired
    private JWTUtils jwtUtils;

    public String setUpNewAuthSecurityContext(final String password,
                                             final String role,
                                             final String email) {

        final String token = this.generateUserToken(role, email);
        System.out.println("New User Token: " + token);
        CustomOAuth2User newAuthUser = new CustomOAuth2User(email, token, role);
        Authentication newAuth = new UsernamePasswordAuthenticationToken(
                newAuthUser,
                password,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
        SecurityContextHolder.getContext().setAuthentication(newAuth);
        return token;
    }

    private String generateUserToken(final String role, final String email) {
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("role", role);
        return this.jwtUtils.generateToken(userInfo, email);
    }
}

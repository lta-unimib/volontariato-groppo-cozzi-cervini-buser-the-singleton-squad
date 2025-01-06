package com.unimib.singletonsquad.doit.Service.Authentication;
import com.unimib.singletonsquad.doit.Security.CustomOAuth2User;
import  com.unimib.singletonsquad.doit.Security.JWTUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationUserService {

    private final JWTUtils jwtUtils;

    public AuthenticationUserService(JWTUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }


    public void setUpNewAuth(Long uniqueId, String role, OAuth2AuthenticationToken principal, OAuth2User user) {
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("role", role);
        String token = this.jwtUtils.generateToken(userInfo, String.valueOf(uniqueId));
        this.setUpNewAuthSecurityContext(uniqueId, token, principal, user);
    }

    private void setUpNewAuthSecurityContext(Long uniqueId, String token, OAuth2AuthenticationToken principal, OAuth2User user) {
        CustomOAuth2User newAuthUser = new CustomOAuth2User(user, uniqueId, token);

        Authentication newAuth = new OAuth2AuthenticationToken(
                newAuthUser,
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                principal.getAuthorizedClientRegistrationId()
        );

        SecurityContextHolder.getContext().setAuthentication(newAuth);
    }



}

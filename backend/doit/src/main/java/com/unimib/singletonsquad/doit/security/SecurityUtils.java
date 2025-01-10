package com.unimib.singletonsquad.doit.security;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtils {


    public static CustomOAuth2User getOAuthUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null && (auth.getPrincipal() instanceof CustomOAuth2User user))
            return user;
        else
            return null;
    }




}

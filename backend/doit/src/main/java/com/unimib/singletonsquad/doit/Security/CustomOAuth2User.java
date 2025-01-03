package com.unimib.singletonsquad.doit.Security;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import java.util.*;

public class CustomOAuth2User implements OAuth2User {
    private Map<String, Object> attributes;
    private OAuth2User delegate;
    private UUID userUniqueId;
    private Collection<GrantedAuthority> authorities;
    private String jwtToken;

    public CustomOAuth2User(OAuth2User delegate, UUID userUniqueId) {
        this.delegate = delegate;
        this.userUniqueId = userUniqueId;
        this.attributes = delegate.getAttributes();
        this.authorities = (Collection<GrantedAuthority>) this.delegate.getAuthorities();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override //Codice univo da Google
    public String getName() {
        return this.delegate.getName();
    }

    public UUID getUserUniqueId() {
        return this.userUniqueId;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getJwtToken() {
        return this.jwtToken;
    }
}

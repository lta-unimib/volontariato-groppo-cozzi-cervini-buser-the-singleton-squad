package com.unimib.singletonsquad.doit.dto;


import lombok.Getter;

public class UserAuthDTO {

    @Getter
    private String authToken;
    @Getter
    private String role;
    private boolean isRegistered;
    @Getter
    private Long userId;

    private UserAuthDTO(Builder builder) {
        this.authToken = builder.authToken;
        this.role = builder.role;
        this.isRegistered = builder.isRegistered;
        this.userId = builder.userId;
    }

    public boolean isRegistered() {
        return isRegistered;
    }

    public static class Builder {

        private String authToken;
        private String role;
        private boolean isRegistered;
        private Long userId;

        public Builder authToken(String authToken) {
            this.authToken = authToken;
            return this;
        }

        public Builder role(String role) {
            this.role = role;
            return this;
        }

        public Builder isRegistered(boolean isRegistered) {
            this.isRegistered = isRegistered;
            return this;
        }

        public Builder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public UserAuthDTO build() {
            return new UserAuthDTO(this);
        }
    }
}
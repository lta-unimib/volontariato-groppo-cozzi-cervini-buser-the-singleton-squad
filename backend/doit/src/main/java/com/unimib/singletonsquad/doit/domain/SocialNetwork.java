package com.unimib.singletonsquad.doit.domain;

public enum SocialNetwork{
    INSTAGRAM {
        final String baseUrl = "https://www.facebook.com/";
        @Override
        public String getCompleteUrl(String username) {
            return baseUrl + username;
        }
    },
    FACEBOOK {
        final String baseUrl = "https://www.facebook.com/";
        @Override
        public String getCompleteUrl(String username) {
            return baseUrl + username;
        }
    },
    WEBSITE {
        @Override
        public String getCompleteUrl(String website) {
            return WEBSITE.name() + website;
        }
    };

    public abstract String getCompleteUrl(String identifier);
}
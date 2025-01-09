package com.unimib.singletonsquad.doit.utils;
public enum FrontendUrls {

    ERROR_URL("/error"),
    FORM_URL("/form"),
    SUCCESS_AUTH("/dashboard"),
    BASE("/");

    private static final String BASE_URL = "http://localhost:3000";


    private final String url;

    FrontendUrls(String url) {
        this.url = url;
    }

    public String getUrl() {
        return BASE_URL + url;
    }

}

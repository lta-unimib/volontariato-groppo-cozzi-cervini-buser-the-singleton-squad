package com.unimib.singletonsquad.doit.Domain;

public class ProfilePicture {

    private String url;

    private ProfilePicture(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}

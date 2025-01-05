package com.unimib.singletonsquad.doit.Domain;

import jakarta.persistence.*;

@Entity
public class ProfilePicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_picture_id")
    @PrimaryKeyJoinColumn(name = "profile_pictures_id")
    int id;

    private String url;

    private ProfilePicture(String url) {
        this.url = url;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ProfilePicture() {

    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}

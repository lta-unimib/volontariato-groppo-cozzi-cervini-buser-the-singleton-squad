package com.unimib.singletonsquad.doit.domain.common;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "profile_picture")
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

    public ProfilePicture() {

    }

}

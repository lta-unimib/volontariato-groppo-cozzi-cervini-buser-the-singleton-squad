package com.unimib.singletonsquad.doit.domain.common;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "profile_picture")
@NoArgsConstructor
@AllArgsConstructor
public class ProfilePicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_picture_id")
    @PrimaryKeyJoinColumn(name = "profile_pictures_id")
    int id;

    private String url;


}

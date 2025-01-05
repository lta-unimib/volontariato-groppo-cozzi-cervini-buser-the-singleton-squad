package com.unimib.singletonsquad.doit.Domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
@Setter
@Getter
@Entity
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
    @Column(unique = true, nullable = false)
    private String name;
    private String description;
    @OneToOne
    private ProfilePicture profilePicture;
    @ElementCollection
    private Map<SocialNetwork, String> socialNetworks;
    private String email;
    private String phoneNumber;

    public Organization() {

    }

    public void setEmail(String email) throws Exception{
        if (email == null) {
            throw new IllegalArgumentException("Email is not valid");
        }
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        if(phoneNumber == null) {
            throw new IllegalArgumentException("Phone number is not valid");
        }
        this.phoneNumber = phoneNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Organization that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}

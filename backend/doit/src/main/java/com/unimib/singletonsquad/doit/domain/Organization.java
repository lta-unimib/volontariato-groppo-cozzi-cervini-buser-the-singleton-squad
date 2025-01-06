package com.unimib.singletonsquad.doit.domain;


import com.unimib.singletonsquad.doit.utils.DataValidator;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;
import java.util.Objects;
@Setter
@Getter
@Entity
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(unique = true, nullable = false)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    private String description;
    @OneToOne(cascade = CascadeType.ALL)
    private ProfilePicture profilePicture;
    @ElementCollection
    private Map<SocialNetwork, String> socialNetworks;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(unique = true)
    private String phoneNumber;

    public Organization() {

    }

    public void setEmail(String email) throws Exception{
        if (!DataValidator.isValidEmail(email)) {
            throw new IllegalArgumentException("Email is not valid");
        }
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        if(phoneNumber == null) {
            this.phoneNumber = null;
            return;
        }
        if(!DataValidator.isValidItalianNumber(phoneNumber)) {
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

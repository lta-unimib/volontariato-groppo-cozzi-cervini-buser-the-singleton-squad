package com.unimib.singletonsquad.doit.domain.organization;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.unimib.singletonsquad.doit.domain.common.Location;
import com.unimib.singletonsquad.doit.domain.common.ProfilePicture;
import com.unimib.singletonsquad.doit.utils.DataValidator;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Objects;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "organization")
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    @Column(unique = true, nullable = false)
    @JsonProperty("organizationName")
    private String name;
    @Column(unique = false, nullable = true)
    private String description;
    @OneToOne(cascade = CascadeType.ALL)
    private ProfilePicture profilePicture;
    private String email;
    @Column(unique = true, nullable = true)
    private String phoneNumber;

    private boolean isRegistered;

    //todo preferenze??
    private String VATNumber;
    private String weSite;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonProperty("address")
    private Location organizationAddress;
    @ElementCollection()
    List<String> categories;

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

    public void addCategories(List<String> categories) {
        categories.addAll(this.categories);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}

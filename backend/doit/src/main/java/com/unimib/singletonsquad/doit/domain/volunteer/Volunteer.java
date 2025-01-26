package com.unimib.singletonsquad.doit.domain.volunteer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.unimib.singletonsquad.doit.domain.common.User;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.exception.validation.EmailException;
import com.unimib.singletonsquad.doit.serializer.OrganizationNameSerializer;
import com.unimib.singletonsquad.doit.utils.data.EmailValidator;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Setter
@Getter
@Entity
@Table(name = "volunteer")
@AllArgsConstructor
@NoArgsConstructor
public class Volunteer implements User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    @JsonIgnore
    private Long id;

    @Column(nullable = false, name = "name")
    @JsonProperty("firstName")
    @NotBlank
    private String name;

    @Column(nullable = false, name = "surname")
    @JsonProperty("lastName")
    @NotBlank
    private String surname;

    @Column(unique = true, nullable = false, name = "email")
    @JsonProperty("email")
    @Email
    @NotBlank
    private String email;

    @Column(nullable = false)
    @JsonIgnore
    @NotBlank

    private String password;

    @NotBlank
    private String description;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private VolunteerPreferences volunteerPreferences;

    @OneToMany(mappedBy = "volunteer", cascade = CascadeType.ALL, orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private List<VolunteerOffer> volunteerOffers = new ArrayList<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "favorite_organizations",
            joinColumns = @JoinColumn(name = "volunteer_id"),
            inverseJoinColumns = @JoinColumn(name = "organization_id")
    )
    @JsonSerialize(using = OrganizationNameSerializer.class)
    @JsonIgnore
    private List<Organization> favoriteOrganizations = new ArrayList<>();

    @OneToOne(mappedBy = "volunteer", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private StatisticVolunteer statistic;


    public void setEmail(String email) throws EmailException {
        if (!isValidEmail(email)) {
            throw new EmailException("Invalid email");
        }
        this.email = email;
    }

    public boolean isVolunteerEmail(String email) {
        return this.email.equals(email);
    }

    private static boolean isValidEmail(String email) {
        return EmailValidator.isValidEmail(email);
    }

    public void removeOrganizationFromFavourite(Organization organization) {
        favoriteOrganizations.remove(organization);
    }

    public void addOrganizationToFavourite(Organization organization) {
        if (!favoriteOrganizations.contains(organization)) {
            favoriteOrganizations.add(organization);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Volunteer volunteer)) return false;
        return Objects.equals(id, volunteer.id) &&
                Objects.equals(name, volunteer.name) &&
                Objects.equals(surname, volunteer.surname) &&
                Objects.equals(email, volunteer.email);
    }



    @Override
    public int hashCode() {
        return Objects.hash(id, name, surname, email);
    }

    @Override
    public String toString() {
        return "Volunteer{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
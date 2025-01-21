package com.unimib.singletonsquad.doit.domain.volunteer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;
import java.util.Objects;

@Setter
@Getter
@Entity
@Table(name = "volunteer")
public class Volunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    @JsonIgnore
    private Long id;

    @Column(nullable = false, name = "name")
    @JsonProperty("firstName")
    private String name;

    @Column(nullable = false, name = "surname")
    @JsonProperty("lastName")
    private String surname;

    @Column(unique = true, nullable = false, name = "email")
    @JsonProperty("email")
    @Email
    private String email;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "id_volunteer_preferences")
    private VolunteerPreferences volunteerPreferences;

    @OneToMany(mappedBy = "volunteer", cascade = CascadeType.ALL, orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private List<VolunteerOffer> volunteerOffers;

    public Volunteer() {}

    public void setEmail(String email) throws Exception {
        if (!isValidEmail(email)) {
            throw new Exception("Invalid email");
        }
        this.email = email;
    }

    private static boolean isValidEmail(String email) {
        String EMAIL_PATTERN = "^[_A-Za-z0-9-+]+(\\.[_A-Za-z0-9-]+)*@" +
                "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[a-z]{2,})$";
        return email.matches(EMAIL_PATTERN);
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

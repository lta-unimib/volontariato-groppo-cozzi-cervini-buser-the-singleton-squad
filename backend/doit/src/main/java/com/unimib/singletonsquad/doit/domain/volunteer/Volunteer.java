package com.unimib.singletonsquad.doit.domain.volunteer;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Setter
@Getter
@Entity
@Table(name = "volunteers")
public class Volunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String surname;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    private String description;
    @OneToOne(cascade = CascadeType.ALL)
    //@JoinColumn(name = "id_volunteer_preferences")
    private VolunteerPreferences volunteerPreferences;

    public Volunteer() {}

    public void setEmail(String email) throws Exception {
        if(!isValidEmail(email)) {
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
        return Objects.equals(id, volunteer.id) && Objects.equals(name, volunteer.name) && Objects.equals(surname, volunteer.surname) && Objects.equals(email, volunteer.email);
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

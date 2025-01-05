package com.unimib.singletonsquad.doit.Domain;

import com.unimib.singletonsquad.doit.Utils.DataValidator;
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
    @Column(nullable = false)
    private String email;
    @Column(nullable = true)
    private String phoneNumber;
    @OneToOne(cascade = CascadeType.ALL)
    private VolunteerPreferences volunteerPreferences;
    @OneToOne(cascade = CascadeType.ALL)
    private ProfilePicture profilePicture;

    public Volunteer(Long id, String name, String surname, String email) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    public Volunteer() {}

    public String getProfilePictureURL() {
        return profilePicture.getUrl();
    }

    public void setEmail(String email) throws Exception {
        if(!DataValidator.isValidEmail(email)) {
            throw new Exception("Invalid email");
        }
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) throws Exception {
        if(!DataValidator.isValidItalianNumber(phoneNumber)) {
            throw new Exception("Invalid phone number");
        }
        this.phoneNumber = phoneNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Volunteer volunteer)) return false;
        return Objects.equals(id, volunteer.id) && Objects.equals(name, volunteer.name) && Objects.equals(surname, volunteer.surname) && Objects.equals(email, volunteer.email) && Objects.equals(phoneNumber, volunteer.phoneNumber);
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
                ", phoneNumber=" + phoneNumber +
                '}';
    }
}

package com.unimib.singletonsquad.doit.Domain;

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
        if(!isValidEmail(email)) {
            throw new Exception("Invalid email");
        }
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) throws Exception {
        if(!isValidItalianNumber(phoneNumber)) {
            throw new Exception("Invalid phone number");
        }
        this.phoneNumber = phoneNumber;
    }

    private static boolean isValidEmail(String email) {
        String EMAIL_PATTERN = "^[_A-Za-z0-9-+]+(\\.[_A-Za-z0-9-]+)*@" +
                "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[a-z]{2,})$";
        return email.matches(EMAIL_PATTERN);
    }

    private static boolean isValidItalianNumber(String numero) {
        // Pattern for italian numbers +39XXXXXXXXX o XXXXXXXXX
        //"^\\+39\\d{10}$" prefix needed
        String pattern = "^(\\+39)?\\d{10}$";
        return numero.matches(pattern);
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

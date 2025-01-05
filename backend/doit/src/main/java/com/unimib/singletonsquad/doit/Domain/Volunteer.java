package com.unimib.singletonsquad.doit.Domain;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "volunteers")
public class Volunteer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String surname;
    @Embedded
    @Column(nullable = false)
    private ContactDetails contactDetails;
    @OneToOne(cascade = CascadeType.ALL)
    private VolunteerPreferences volunteerPreferences;
    @OneToOne(cascade = CascadeType.ALL)
    private ProfilePicture profilePicture;

    public Volunteer(int id, String name, String surname, ContactDetails contactDetails) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.contactDetails = contactDetails;
    }

    public Volunteer() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public ContactDetails getContactDetails() {
        return contactDetails;
    }

    public void setContactDetails(ContactDetails contactDetails) {
        this.contactDetails = contactDetails;
    }

    public VolunteerPreferences getVolunteerPreferences() {
        return volunteerPreferences;
    }

    public void setVolunteerPreferences(VolunteerPreferences volunteerPreferences) {
        this.volunteerPreferences = volunteerPreferences;
    }

    public ProfilePicture getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(ProfilePicture profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getProfilePictureURL() {
        return profilePicture.getUrl();
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Volunteer volunteer)) return false;
        return Objects.equals(id, volunteer.id) && Objects.equals(name, volunteer.name) && Objects.equals(surname, volunteer.surname) && Objects.equals(contactDetails, volunteer.contactDetails);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, surname, contactDetails);
    }

    @Override
    public String toString() {
        return "Volunteer{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", contactDetails=" + contactDetails +
                '}';
    }
}

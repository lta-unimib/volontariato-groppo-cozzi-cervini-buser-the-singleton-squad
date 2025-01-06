package com.unimib.singletonsquad.doit.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;

@Setter
@Getter
@Entity
@Table(name = "volunteer_preferences")
public class VolunteerPreferences {
    @Id
    private int id;
    @org.springframework.data.annotation.Id
    //private LocalDateTime dateTime;
    private String duration;
    @OneToOne
    private Location location;
    Collection<VolunteerCategories> volunteerCategories;
    private String volunteerId;

    /*public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }*/

    public void addNewVolunteerCategories(VolunteerCategories volunteerCategories) {
        this.volunteerCategories.add(volunteerCategories);
    }

    @Override
    public String toString() {
        return "VolunteerPreferences{" +
                //"dateTime=" + dateTime +
                ", duration='" + duration + '\'' +
                ", location=" + location +
                ", volunteerCategories=" + volunteerCategories +
                '}';
    }

}

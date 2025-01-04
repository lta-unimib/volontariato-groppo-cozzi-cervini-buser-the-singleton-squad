package com.unimib.singletonsquad.doit.Domain;

import java.time.LocalDateTime;
import java.util.Collection;

public class VolunteerPreferences {
    private LocalDateTime dateTime;
    private String duration;
    private Location location;
    Collection<VolunteerCategories> volunteerCategories;

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Collection<VolunteerCategories> getVolunteerCategories() {
        return volunteerCategories;
    }

    public void setVolunteerCategories(Collection<VolunteerCategories> volunteerCategories) {
        this.volunteerCategories = volunteerCategories;
    }

    public void addNewVolunteerCategories(VolunteerCategories volunteerCategories) {
        this.volunteerCategories.add(volunteerCategories);
    }

    @Override
    public String toString() {
        return "VolunteerPreferences{" +
                "dateTime=" + dateTime +
                ", duration='" + duration + '\'' +
                ", location=" + location +
                ", volunteerCategories=" + volunteerCategories +
                '}';
    }
}

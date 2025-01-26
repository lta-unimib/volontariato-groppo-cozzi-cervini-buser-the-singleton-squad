package com.unimib.singletonsquad.doit.domain.volunteer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.unimib.singletonsquad.doit.domain.common.Availability;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "volunteer_preferences")
public class VolunteerPreferences {
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    private String city;

    @ElementCollection()
    @JsonProperty("preferences")
    private List<String> categories;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(nullable = false, name = "availability_id")
    private Availability availability;

    @Override
    public String toString() {
        return "VolunteerPreferences{" +
                "city='" + city + '\'' +
                ", volunteerCategories=" + categories +
                '}';
    }

    public boolean hasCategories(List<String> categories) {
        for (String category : categories) {
            if (categories.contains(category)) {
                return true;
            }
        }
        return false;
    }

    public boolean hasAvailability(LocalDateTime start, LocalDateTime end) {
        return this.availability.matching(start, end);
    }
}
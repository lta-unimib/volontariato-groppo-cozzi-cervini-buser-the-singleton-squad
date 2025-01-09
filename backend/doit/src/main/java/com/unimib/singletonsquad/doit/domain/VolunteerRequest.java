package com.unimib.singletonsquad.doit.domain;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
public class VolunteerRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    @Column(nullable = false)
    private String title;
    private String detailedDescription;
    private int capacity;
    @OneToOne(cascade = CascadeType.ALL)
    private Location location;
    private String volunteerType;
    private String startDateTime;
    private String endDateTime;

    @OneToOne(cascade = CascadeType.ALL)
    private Organization organization;
    @ElementCollection
    private List<String> volunteerCategories;

    public VolunteerRequest() {}

    public void setCapacity(int capacity) {
        if(capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be a positive number");
        } else {
            this.capacity = capacity;
        }
    }

    public boolean hasCategory(String category) {
        return volunteerCategories.contains(category);
    }

    public String getCity() {
        return location.getCity();
    }

    public boolean hasCategories(List<String> categories) {
        for(String category : categories) {
            if(volunteerCategories.contains(category)) {
                return true;
            }
        }
        return false;
    }
}

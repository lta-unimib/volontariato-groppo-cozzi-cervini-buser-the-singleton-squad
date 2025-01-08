package com.unimib.singletonsquad.doit.domain;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
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
    /*
    @OneToOne
    private Location location;
    private VolunteeringType volunteeringType;

    @Embedded
    private LocalDateTime startDateTime;
    @Embedded
    private LocalDateTime endDateTime;
    @OneToOne
    private Organization organization;
    @ElementCollection
    private List<String> volunteerCategories;*/

    public VolunteerRequest() {}

    public void setCapacity(int capacity) {
        if(capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be a positive number");
        } else {
            this.capacity = capacity;
        }
    }
}

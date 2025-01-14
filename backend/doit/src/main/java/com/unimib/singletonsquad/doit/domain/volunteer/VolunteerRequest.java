package com.unimib.singletonsquad.doit.domain.volunteer;

import com.unimib.singletonsquad.doit.domain.common.Address;
import com.unimib.singletonsquad.doit.domain.common.Status;
import com.unimib.singletonsquad.doit.domain.common.VolunteeringType;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
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
    private Address location;
    @Enumerated(EnumType.STRING)
    private VolunteeringType volunteerType;
    private String startDateTime;
    private String endDateTime;
    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToOne(cascade = CascadeType.ALL)
    private Organization organization;//ok
    @ElementCollection
    private List<String> volunteerCategories;//ok

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

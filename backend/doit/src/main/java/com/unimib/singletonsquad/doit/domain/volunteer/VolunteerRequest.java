package com.unimib.singletonsquad.doit.domain.volunteer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.unimib.singletonsquad.doit.domain.common.Address;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.serializer.OrganizationNameSerializer;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@NoArgsConstructor
public class VolunteerRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    private String title;
    private String detailedDescription;
    private int capacity;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    private String volunteerType;
    private String startDateTime;
    private String endDateTime;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "organization_id", nullable = false) // Colonna della foreign key
    @JsonSerialize(using = OrganizationNameSerializer.class)
    private Organization organization;

    @ElementCollection
    @CollectionTable(name = "volunteer_request_categories", joinColumns = @JoinColumn(name = "volunteer_request_id"))
    @Column(name = "category")
    private List<String> volunteerCategories;

    public void setCapacity(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be a positive number");
        } else {
            this.capacity = capacity;
        }
    }

    public boolean hasCategory(String category) {
        return volunteerCategories.contains(category);
    }

    public String getCity() {
        return address.getCity();
    }

    public boolean hasCategories(List<String> categories) {
        for (String category : categories) {
            if (volunteerCategories.contains(category)) {
                return true;
            }
        }
        return false;
    }
}

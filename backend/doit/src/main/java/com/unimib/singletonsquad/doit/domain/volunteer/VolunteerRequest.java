package com.unimib.singletonsquad.doit.domain.volunteer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.unimib.singletonsquad.doit.domain.common.Address;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.serializer.OrganizationNameSerializer;
import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @JoinColumn(name = "organization_id", nullable = false)
    @JsonSerialize(using = OrganizationNameSerializer.class)
    private Organization organization;
    @ElementCollection
    @CollectionTable(name = "volunteer_request_categories", joinColumns = @JoinColumn(name = "volunteer_request_id"))
    @Column(name = "category")
    @OnDelete(action = OnDeleteAction.CASCADE)
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

    public boolean hasCategories(List<String> categories) {
        for (String category : categories) {
            if (volunteerCategories.contains(category)) {
                return true;
            }
        }
        return false;
    }
}

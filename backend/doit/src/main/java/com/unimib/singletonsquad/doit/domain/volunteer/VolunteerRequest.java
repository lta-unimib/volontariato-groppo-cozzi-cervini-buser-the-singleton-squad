package com.unimib.singletonsquad.doit.domain.volunteer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.unimib.singletonsquad.doit.domain.common.Address;
import com.unimib.singletonsquad.doit.domain.common.Availability;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.serializer.OrganizationNameSerializer;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

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

    @Column(nullable = false, name = "title")
    private String title;

    @Column(nullable = false, name = "detailed_description")
    private String detailedDescription;

    @Column(nullable = false, name = "capacity")
    private int capacity;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "address_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Address address;

    private String volunteerType;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "organization_id", nullable = false)
    @JsonSerialize(using = OrganizationNameSerializer.class)
    private Organization organization;

    @ElementCollection
    @CollectionTable(name = "volunteer_request_categories", joinColumns = @JoinColumn(name = "volunteer_request_id"))
    @Column(name = "category")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<String> volunteerCategories;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "volunteer_offer_id")
    private List<VolunteerOffer> volunteerOffer;

    @OneToMany(mappedBy = "volunteerRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<VolunteerOffer> volunteerOffers;

    public void setCapacity(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be a positive integer");
        } else {
            this.capacity = capacity;
        }
    }

    public boolean hasCategory(String category) {
        return volunteerCategories.contains(category);
    }
}

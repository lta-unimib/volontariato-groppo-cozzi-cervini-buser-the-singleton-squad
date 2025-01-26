package com.unimib.singletonsquad.doit.domain.volunteer;

import com.unimib.singletonsquad.doit.domain.common.Address;
import com.unimib.singletonsquad.doit.domain.organization.FeedbackOrganization;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString(exclude = {"organization", "volunteerOffers", "feedbackList"})
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

    @Column(nullable = true, name = "total_participants")
    private int totalParticipants = 0;

    private int totalFeedbacks = 0;
    private double sommaVoti = 0.0;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Address address;

    @Column(nullable = false)
    private LocalDateTime startDateTime;

    @Column(nullable = false)
    private LocalDateTime endDateTime;

    @ManyToOne(fetch = FetchType.LAZY)
    private Organization organization; // Excluded from serialization

    @ElementCollection
    @CollectionTable(name = "volunteer_request_categories", joinColumns = @JoinColumn(name = "volunteer_request_id"))
    @Column(name = "category")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<String> volunteerCategories = new ArrayList<>();

    @OneToMany(mappedBy = "volunteerRequest", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<VolunteerOffer> volunteerOffers = new ArrayList<>(); // Excluded from serialization

    @OneToMany(mappedBy = "volunteerRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FeedbackOrganization> feedbackList = new ArrayList<>();


    public void decreaseCapacity() {
        if(this.capacity == 0)
            throw new IllegalStateException("Siamo arrivati allo 0 della capacità");
        this.capacity -= 1;
    }


    public void setCapacity(int capacity) {
        if (capacity < 0) {
            throw new IllegalArgumentException("Capacity must be a positive integer");
        }
        this.capacity = capacity;
    }

    public boolean hasCategory(String category) {
        return volunteerCategories.contains(category);
    }
}

package com.unimib.singletonsquad.doit.domain.volunteer;

import com.unimib.singletonsquad.doit.domain.common.Address;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString(exclude = {"organization", "volunteerOffers", "feedbackMap"})
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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "volunteer_request_feedback",
            joinColumns = @JoinColumn(name = "volunteer_request_id"),
            inverseJoinColumns = @JoinColumn(name = "feedback_id")
    )
    private Map<VolunteerOffer, Feedback> feedbackMap = new HashMap<>(); // Excluded from serialization

    // Metodo per la serializzazione personalizzata
    public Map<String, Object> toSerializableMap() {
        Map<String, Object> serialized = new HashMap<>();
        serialized.put("id", this.id);
        serialized.put("title", this.title);
        serialized.put("detailedDescription", this.detailedDescription);
        serialized.put("capacity", this.capacity);
        serialized.put("address", this.address); // Puoi escludere singoli campi se necessario
        return serialized;
    }

    public void setCapacity(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be a positive integer");
        }
        this.capacity = capacity;
    }

    public void addFeedback(VolunteerOffer offer, Feedback feedback) {
        this.feedbackMap.put(offer, feedback);
    }

    public boolean hasCategory(String category) {
        return volunteerCategories.contains(category);
    }
}

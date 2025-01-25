package com.unimib.singletonsquad.doit.domain.volunteer;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unimib.singletonsquad.doit.domain.common.Status;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Objects;

@Setter
@Getter
@Entity
@ToString(exclude = "volunteerRequest")
@NoArgsConstructor
@Table(name = "volunteer_offers")
public class VolunteerOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "volunteer_id")
    private Volunteer volunteer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "volunteer_request_id")
    @JsonBackReference
    private VolunteerRequest volunteerRequest;

    @Column(nullable = false)
    private boolean votedByVolunteer;

    @Column(nullable = false)
    private boolean votedByOrganization;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "feedback_id", referencedColumnName = "id")
    @JsonIgnore
    private Feedback feedback;

    public Organization getOrganization() {
        return volunteerRequest != null ? volunteerRequest.getOrganization() : null;
    }

    public boolean isVolunteerOffer(String volunteerEmail) {
        return volunteer != null && volunteer.isVolunteerEmail(volunteerEmail);
    }

    public boolean isOrganizationOffer(String organizationEmail) {
        return volunteerRequest != null && volunteerRequest.getOrganization() != null
                && volunteerRequest.getOrganization().getEmail().equals(organizationEmail);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof VolunteerOffer that)) return false;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
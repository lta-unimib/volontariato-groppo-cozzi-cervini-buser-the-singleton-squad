package com.unimib.singletonsquad.doit.domain.volunteer;

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
@ToString
@NoArgsConstructor
@Table(name = "volunteer_offers")
public class VolunteerOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Volunteer volunteer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private VolunteerRequest volunteerRequest;

    /// indica se gli è stato assegnato il voto o meno
    private boolean voted;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof VolunteerOffer)) return false;
        VolunteerOffer that = (VolunteerOffer) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(volunteer, that.volunteer) &&
                status == that.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, volunteer, status);
    }

    public Organization getOrganization() {
        return volunteerRequest.getOrganization();
    }

    public boolean isVolunteerOffer(String volunteerEmail) {
        return this.volunteer.isVolunteerEmail(volunteerEmail);
    }

    public boolean isOrganizationOffer(String organizationEmail) {
        return volunteerRequest.getOrganization().getEmail().equals(organizationEmail);
    }
}

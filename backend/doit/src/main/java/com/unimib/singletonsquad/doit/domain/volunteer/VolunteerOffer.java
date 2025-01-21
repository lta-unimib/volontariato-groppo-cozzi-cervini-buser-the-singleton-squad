package com.unimib.singletonsquad.doit.domain.volunteer;

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

    @Column(nullable = false)
    private String competenceDescription;

    // Relazione con Organization
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "organization_id", referencedColumnName = "id", nullable = false)
    private Organization organization;

    // Relazione con Volunteer
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "volunteer_id", nullable = false)
    private Volunteer volunteer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    // Override di equals e hashCode per la corretta gestione degli oggetti
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof VolunteerOffer)) return false;
        VolunteerOffer that = (VolunteerOffer) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(competenceDescription, that.competenceDescription) &&
                Objects.equals(organization, that.organization) &&
                Objects.equals(volunteer, that.volunteer) &&
                status == that.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, competenceDescription, organization, volunteer, status);
    }
}

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
    @JoinColumn(name = "volunteer_id")  // La relazione non ha bisogno di cascata
    private Volunteer volunteer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "volunteer_request_id")  // La relazione non ha bisogno di cascata
    private VolunteerRequest volunteerRequest;

    // Indica se gli è stato assegnato il voto o meno
    @Column(nullable = false)
    private boolean votedByVolunteer;
    /// voto dell'organizzazione dall'utente
    @Column(nullable = false)
    private boolean votedByOrganization;



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

    // Metodo per ottenere l'organizzazione associata a questa offerta
    public Organization getOrganization() {
        return volunteerRequest.getOrganization();
    }

    // Verifica se l'email del volontario corrisponde a questa offerta
    public boolean isVolunteerOffer(String volunteerEmail) {
        return this.volunteer.isVolunteerEmail(volunteerEmail);
    }

    // Verifica se l'email dell'organizzazione corrisponde a questa offerta
    public boolean isOrganizationOffer(String organizationEmail) {
        return volunteerRequest.getOrganization().getEmail().equals(organizationEmail);
    }
}

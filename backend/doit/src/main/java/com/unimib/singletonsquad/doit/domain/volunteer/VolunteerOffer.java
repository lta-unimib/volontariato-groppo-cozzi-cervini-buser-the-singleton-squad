package com.unimib.singletonsquad.doit.domain.volunteer;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@Entity
@ToString
@NoArgsConstructor
@Table(name = "volunteer_offers")
public class VolunteerOffer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    private String competenceDescription;
    @ManyToOne
    private VolunteerPreferences volunteerPreferences;
    @OneToOne
    private Organization organization;
    @OneToOne
    private Volunteer volunteer;
}

package com.unimib.singletonsquad.doit.domain.common;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class StatisticOrganization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private double mediPesata;
    private int numeroTotalePartecipanti;

    @OneToOne
    @JoinColumn(name = "organization_id")
    @JsonIgnore
    private Organization organization;

}


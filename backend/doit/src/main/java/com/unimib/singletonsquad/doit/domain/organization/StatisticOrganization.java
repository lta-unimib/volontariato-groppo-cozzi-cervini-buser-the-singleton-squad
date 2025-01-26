package com.unimib.singletonsquad.doit.domain.organization;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


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


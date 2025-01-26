package com.unimib.singletonsquad.doit.domain.organization;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class StatisticOrganization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private int id;

    private Double averageVotes;
    private Integer totalFeedback;
    private Integer numeroTotalePartecipanti;

    @OneToOne
    @JoinColumn(name = "organization_id")
    @JsonIgnore
    private Organization organization;

}


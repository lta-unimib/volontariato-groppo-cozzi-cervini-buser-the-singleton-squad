package com.unimib.singletonsquad.doit.domain.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class StatisticVolunteer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int totalVotes;

    @Column(nullable = false)
    private double averageVotes;


    @OneToOne
    @JoinColumn(name = "volunteer_id")
    @JsonIgnore// Colonna che contiene la chiave esterna
    private Volunteer volunteer;


    public void addAverageVotes(double newVoto){
        addVotes();
        this.averageVotes = (newVoto+averageVotes)/totalVotes;
    }
    public void addVotes(){
        this.totalVotes++;
    }


}


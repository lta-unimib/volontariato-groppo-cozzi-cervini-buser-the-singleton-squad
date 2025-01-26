package com.unimib.singletonsquad.doit.domain.volunteer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class StatisticVolunteer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Column(nullable = false)
    @JsonProperty("totalReviews")
    private Integer totalFeedback;

    @Column(nullable = false)
    @JsonProperty("averageRating")
    private Double averageVotes;


    @OneToOne
    @JoinColumn(name = "volunteer_id")
    @JsonIgnore
    private Volunteer volunteer;


    public void addAverageVotes(double newVoto){
        addVotes();
        this.averageVotes = (newVoto+averageVotes)/ totalFeedback;
    }
    public void addVotes(){
        this.totalFeedback++;
    }


}


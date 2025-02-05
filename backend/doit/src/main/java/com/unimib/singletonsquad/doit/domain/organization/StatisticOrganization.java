package com.unimib.singletonsquad.doit.domain.organization;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonProperty("averageRating")
    private Double averageVotes;
    @JsonProperty("totalReviews")
    private Integer totalFeedback;
    private Integer totalNumberOfParticipants;

    @OneToOne
    @JoinColumn(name = "organization_id")
    @JsonIgnore
    private Organization organization;

}


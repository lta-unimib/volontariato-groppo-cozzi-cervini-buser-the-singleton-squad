package com.unimib.singletonsquad.doit.domain.organization;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FeedbackOrganization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private double vote;
    private Long volunteerId;

    @ManyToOne
    @JsonIgnore
    private VolunteerRequest volunteerRequest;


}

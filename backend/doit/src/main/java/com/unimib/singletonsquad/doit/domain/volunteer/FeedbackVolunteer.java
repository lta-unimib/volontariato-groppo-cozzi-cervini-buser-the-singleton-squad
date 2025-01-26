package com.unimib.singletonsquad.doit.domain.volunteer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackVolunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "vote")
    private double vote;

    public void setVote(double vote) {
        if(vote < 0)
            throw new IllegalArgumentException("vote must be a positive number");
        this.vote = vote;
    }

}

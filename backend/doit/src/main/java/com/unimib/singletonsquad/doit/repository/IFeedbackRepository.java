package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IFeedbackRepository extends JpaRepository<Feedback, Long> {

    @Query("SELECT f.votes from Feedback as f where ")
    List<Double> getAllVotestByEventsByOfferId(int offerId);
}

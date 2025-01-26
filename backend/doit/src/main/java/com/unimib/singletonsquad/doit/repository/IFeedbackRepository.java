package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFeedbackRepository extends JpaRepository<Feedback, Long> {

}

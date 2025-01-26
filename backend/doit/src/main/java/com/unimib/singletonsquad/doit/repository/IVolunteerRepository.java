package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Primary
@Repository
public interface IVolunteerRepository extends JpaRepository<Volunteer, Long> {
    boolean existsByEmail(String email);
    Optional<Volunteer> findByEmail(String email);
}

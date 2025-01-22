package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import jakarta.validation.constraints.Email;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Primary
@Repository
public interface IVolunteerRepository extends JpaRepository<Volunteer, Long> {
    List<Volunteer> findByName(String name);
    List<Volunteer> findBySurname(String surname);
    Optional<Volunteer> findByNameAndSurname(String name, String surname);
    boolean existsByEmail(String email);
    Optional<Volunteer> findByEmail(String email);
    Optional<Volunteer> findByEmailAndSurname(String email, String surname);
    boolean existsByEmailAndSurname(String email, String surname);
    Optional<Volunteer> findFirstByIdGreaterThan(Long id);
    List<Volunteer> findByIdBetween(Long startId, Long endId);
    boolean existsByIdLessThan(Long id);
    void deleteByEmail(String email);
}

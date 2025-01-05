package com.unimib.singletonsquad.doit.Repository;

import com.unimib.singletonsquad.doit.Domain.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JPAVolunteerRepository extends JpaRepository<Volunteer, String>, IVolunteerRepository {
    // I metodi di JpaRepository sono ereditati automaticamente:
    // save(), findById(), findAll(), deleteById(), etc.

    // Implementazione automatica dei metodi di IVolunteerRepository
    @Override
    List<Volunteer> findByName(String name);

    @Override
    List<Volunteer> findBySurname(String surname);

    @Override
    Optional<Volunteer> findByContactDetails_Email(String email);
}
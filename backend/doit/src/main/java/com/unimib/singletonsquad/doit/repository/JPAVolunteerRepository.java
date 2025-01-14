package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JPAVolunteerRepository extends JpaRepository<Volunteer, Long>, IVolunteerRepository {
    // JpaRepository methods are automatically inherited:
    // save(), findById(), findAll(), deleteById(), etc.

    // Automatic implementation  dei metodi di IVolunteerRepository
    @Override
    List<Volunteer> findByName(String name);

    @Override
    List<Volunteer> findBySurname(String surname);

    @Override
    boolean existsByEmail(String email);
}
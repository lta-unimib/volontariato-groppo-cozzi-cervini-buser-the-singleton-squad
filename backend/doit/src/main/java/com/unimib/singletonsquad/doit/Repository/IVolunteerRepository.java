package com.unimib.singletonsquad.doit.Repository;

import com.unimib.singletonsquad.doit.Domain.Volunteer;

import java.util.List;
import java.util.Optional;

public interface IVolunteerRepository {
    Volunteer save(Volunteer volunteer);
    Optional<Volunteer> findById(Long id);
    List<Volunteer> findAll();
    void deleteById(Long id);
    boolean existsById(Long id);
    List<Volunteer> findByName(String name);
    List<Volunteer> findBySurname(String surname);
    boolean existsByEmail(String email);//returns Volunteer id
    Optional<Volunteer> findByEmail(String email);

}
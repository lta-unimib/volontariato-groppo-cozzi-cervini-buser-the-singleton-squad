package com.unimib.singletonsquad.doit.Repository;

import com.unimib.singletonsquad.doit.Domain.Volunteer;

import java.util.List;
import java.util.Optional;

public interface IVolunteerRepository {
    Volunteer save(Volunteer volunteer);
    Optional<Volunteer> findById(String id);
    List<Volunteer> findAll();
    void deleteById(String id);
    boolean existsById(String id);
    List<Volunteer> findByName(String name);
    List<Volunteer> findBySurname(String surname);
    Optional<Volunteer> findByContactDetails_Email(String email);
    String isVolunteerExist(String email);//returns Volunteer id
}
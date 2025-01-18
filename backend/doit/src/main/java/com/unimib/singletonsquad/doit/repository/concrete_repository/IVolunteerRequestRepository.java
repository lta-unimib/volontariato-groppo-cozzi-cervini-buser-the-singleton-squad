package com.unimib.singletonsquad.doit.repository.concrete_repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;

import java.util.Optional;
import java.util.List;
public interface IVolunteerRequestRepository {
    VolunteerRequest save(VolunteerRequest organization);

    Optional<VolunteerRequest> findById(long id);
    void deleteById(long id);
    boolean existsById(long id);

    List<VolunteerRequest> findAll();
    List<VolunteerRequest> findByOrganization_Email(String email);
}

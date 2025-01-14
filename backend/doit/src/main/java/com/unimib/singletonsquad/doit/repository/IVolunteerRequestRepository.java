package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;

import java.util.Optional;

public interface IVolunteerRequestRepository {
    VolunteerRequest save(VolunteerRequest organization);

    Optional<VolunteerRequest> findById(long id);
    void deleteById(long id);
    VolunteerRequest update(VolunteerRequest updatedRequest);
    boolean existsById(long id);

}

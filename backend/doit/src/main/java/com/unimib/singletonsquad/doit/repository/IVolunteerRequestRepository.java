package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.VolunteerRequest;

import java.util.Optional;

public interface IVolunteerRequestRepository {
    VolunteerRequest save(VolunteerRequest organization);

    Optional<VolunteerRequest> findById(long id);
}

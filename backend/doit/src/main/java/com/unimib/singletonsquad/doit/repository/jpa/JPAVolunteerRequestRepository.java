package com.unimib.singletonsquad.doit.repository.jpa;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.repository.concrete_repository.IVolunteerRequestRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAVolunteerRequestRepository extends JpaRepository<VolunteerRequest,Long>, IVolunteerRequestRepository {
    @Override
    void deleteById(long id);
}

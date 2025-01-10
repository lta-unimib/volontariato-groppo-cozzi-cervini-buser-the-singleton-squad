package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAVolunteerRequestRepository extends JpaRepository<VolunteerRequest,Long>, IVolunteerRequestRepository {

}

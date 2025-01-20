package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;
public interface IVolunteerRequestRepository extends JpaRepository<VolunteerRequest, Long> {
    Optional<VolunteerRequest> findById(long id);
    void deleteById(long id);
    boolean existsById(long id);
    List<VolunteerRequest> findByOrganization_Email(String email);
}

package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;
public interface IVolunteerRequestRepository extends JpaRepository<VolunteerRequest, Long> {
    Optional<VolunteerRequest> findById(long id);
    void deleteById(long id);
    boolean existsById(long id);
    List<VolunteerRequest> findByOrganization_Email(String email);

    @Query(value = "SELECT v FROM VolunteerRequest AS v WHERE TO_TIMESTAMP(v.endDateTime, 'YYYY-MM-DD\"T\"HH24:MI:SS') > :oggi AND v.capacity > 0")
    List<VolunteerRequest> getAllRequest(@Param("oggi") LocalDateTime oggi);

}

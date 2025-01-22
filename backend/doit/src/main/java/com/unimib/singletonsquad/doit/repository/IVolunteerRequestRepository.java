package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;
public interface IVolunteerRequestRepository extends JpaRepository<VolunteerRequest, Long> {
    Optional<VolunteerRequest> findById(long id);
    void deleteById(long id);
    boolean existsById(long id);
    List<VolunteerRequest> findByOrganization_Email(String email);

    @Query(value = "SELECT v FROM VolunteerRequest AS v WHERE :oggi <= v.endDateTime AND v.capacity > 0")
    List<VolunteerRequest> getAllRequest(@Param("oggi") LocalDateTime oggi);

    @Query(value = "SELECT v FROM VolunteerRequest AS v WHERE :oggi <= v.endDateTime AND v.capacity > 0 ORDER BY v.startDateTime")
    List<VolunteerRequest> getAllRequestTimeSorted(@Param("oggi") LocalDateTime oggi);
}

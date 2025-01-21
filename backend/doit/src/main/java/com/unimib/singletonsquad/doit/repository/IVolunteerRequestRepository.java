package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;
public interface IVolunteerRequestRepository extends JpaRepository<VolunteerRequest, Long> {
    Optional<VolunteerRequest> findById(long id);
    void deleteById(long id);
    boolean existsById(long id);
    List<VolunteerRequest> findByOrganization_Email(long volunteerId);

    @Query(value = "SELECT * FROM nome_tabella WHERE capacita > 0 AND  (end_date_time IS NULL OR end_date_time < :oggi)", nativeQuery = true)
    List<VolunteerRequest> getAllRequest(@Param("oggi") LocalDate oggi);

}

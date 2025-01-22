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



    /// Ritorna tutte e che non è registrato
    @Query(value = "SELECT v FROM VolunteerRequest AS v WHERE :oggi <= v.endDateTime AND v.capacity > 0 ORDER BY v.startDateTime")
    List<VolunteerRequest> getAllRequestTimeSorted(@Param("oggi") LocalDateTime oggi);

    /// Deve ritornare tutti gli eventi ai quali l'utente ha partecipato e che non ha ancora votato
    @Query(value = "SELECT DISTINCT v FROM VolunteerRequest as v JOIN v.volunteerOffers as o on o.volunteer.email = :emailUser where o.voted = FALSE AND v.endDateTime < :oggi")
    List<VolunteerRequest> getAllRequestToAssingVote(@Param("oggi") LocalDateTime oggi, @Param("emailUser") String emailUser);


    /// 1: generali a cui non è iscritti
    /// 2: quelli a cui è iscritto e che non sono attivi, ordinato in base alla scadenza
    /// 3: quelli in cui devi votare in ordine di scadenza
    /// 4: quelli a cui ti sei iscritto e che hai votato
}


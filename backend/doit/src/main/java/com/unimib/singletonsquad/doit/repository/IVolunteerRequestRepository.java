package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
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
    List<VolunteerRequest> findByOrganization_Name(String name);


    /// Ritorna tutte e che non è registrato ORDINATE PER DATA DECRESCENTE
    /// Da usare per L'algoritmo di Sorting
    @Query("SELECT v FROM VolunteerRequest v WHERE :oggi <= v.endDateTime AND v.capacity > 0 AND NOT EXISTS (SELECT o FROM v.volunteerOffers o WHERE o.volunteer.email = :userEmail) ORDER BY v.startDateTime")
    List<VolunteerRequest> getAllRequestNotRegistered(@Param("oggi") LocalDateTime oggi, @Param("userEmail") String userEmail);

    /// Ritorna tutte le requeste a cui è registrato e che non sono terminate
    @Query(value = "SELECT v FROM VolunteerRequest As v JOIN v.volunteerOffers as o WHERE :oggi <= v.endDateTime AND o.volunteer.email = :userEmail ORDER BY v.endDateTime")
    List<VolunteerRequest> getAllRequestRegistered(@Param("oggi") LocalDateTime oggi, @Param("userEmail") String userEmail);

    /// Deve ritornare tutti gli eventi ai quali l'utente ha partecipato e che non ha ancora votato
    @Query(value = "SELECT DISTINCT v FROM VolunteerRequest as v JOIN v.volunteerOffers as o on o.volunteer.email = :emailUser where o.votedByVolunteer = FALSE AND v.endDateTime < :oggi ORDER BY v.startDateTime")
    List<VolunteerRequest> getAllRequestNotVoted(@Param("oggi") LocalDateTime oggi, @Param("emailUser") String emailUser);

    /// Ritorna tutti gli eventi a cui è partecipato e che ha votato
    @Query(value = "SELECT DISTINCT v FROM VolunteerRequest AS v JOIN v.volunteerOffers as o on  o.volunteer.email = :emailUser where o.votedByVolunteer = TRUE AND v.endDateTime < :oggi ORDER BY v.startDateTime")
    List<VolunteerRequest> getALlRequestVoted(@Param("oggi") LocalDateTime oggi, @Param("emailUser") String emailUser);



    ///
    @Query("SELECT DISTINCT request FROM VolunteerRequest AS request JOIN request.volunteerOffers AS offer WHERE request.id = :idRequest  and offer.volunteer.id = :idVolontario AND request.endDateTime > :oggi AND offer.votedByVolunteer = FALSE ")
    Optional<VolunteerRequest> getSpecificVolunteerRequestFeedback(@Param("idVolontario") long idVolunteer, @Param("idRequest") long idRequest , @Param("oggi") LocalDateTime oggi);

    List<VolunteerRequest> id(Long id);

    @Query("SELECT o.volunteer from VolunteerOffer  o where o.volunteerRequest.id = :idRequest and o.votedByOrganization = false")
    List<Volunteer> getAllVolunteerByRequest(@Param("idRequest") Long idRequest);
}


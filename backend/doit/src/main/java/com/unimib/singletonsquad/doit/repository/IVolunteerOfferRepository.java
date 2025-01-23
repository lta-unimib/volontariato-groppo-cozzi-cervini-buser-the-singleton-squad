package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface IVolunteerOfferRepository extends JpaRepository<VolunteerOffer, Integer> {
    VolunteerOffer save(VolunteerOffer offer);

    /// NOTA: USARE I NOMI DELLE ENTITà E NON QUELLI DELLE TABELLE
    @Query("SELECT o FROM VolunteerOffer as o where o.volunteerRequest.organization.email = :email and o.volunteerRequest.endDateTime <= :oggi")
    List<VolunteerOffer> getAllOfferOrganization(@Param("email") String email, @Param("oggi") LocalDateTime oggi);

    /// Get all the of the volunteer
    @Query("SELECT o FROM VolunteerOffer as o where o.volunteer.email = :email")
    List<VolunteerOffer> getAllOfferVolunteer(String email);


    Optional<VolunteerOffer> findById(Long id);



}

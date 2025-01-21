package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IVolunteerOfferRepository extends JpaRepository<VolunteerOffer, Integer> {
    VolunteerOffer save(VolunteerOffer offer);

    /// NOTA: USARE I NOMI DELLE ENTITà E NON QUELLI DELLE TABELLE
    @Query("SELECT o FROM VolunteerOffer as o where o.volunteer.email = :email")
    List<VolunteerOffer> getAllOffer(@Param("email") String email);

    VolunteerOffer getVolunteerOfferById(Long id);
}

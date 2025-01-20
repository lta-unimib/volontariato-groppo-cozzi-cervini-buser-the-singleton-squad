package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVolunteerOfferRepository extends JpaRepository<VolunteerOffer, Integer> {
    VolunteerOffer save(VolunteerOffer offer);
}

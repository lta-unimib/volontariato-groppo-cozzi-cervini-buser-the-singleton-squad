package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAVolunteerOfferRepository extends JpaRepository<VolunteerOffer, Long>, IVolunteerOfferRepository {}

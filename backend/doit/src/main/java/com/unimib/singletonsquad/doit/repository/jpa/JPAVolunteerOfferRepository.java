package com.unimib.singletonsquad.doit.repository.jpa;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.repository.concrete_repository.IVolunteerOfferRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAVolunteerOfferRepository extends JpaRepository<VolunteerOffer, Long>, IVolunteerOfferRepository {}

package com.unimib.singletonsquad.doit.repository.jpa;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import com.unimib.singletonsquad.doit.repository.concrete_repository.IAvailabilityRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAAvailabilityRepository extends JpaRepository<Availability, Long>, IAvailabilityRepository {

}

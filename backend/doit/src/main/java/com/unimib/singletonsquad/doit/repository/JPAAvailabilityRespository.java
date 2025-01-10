package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAAvailabilityRespository extends JpaRepository<Availability, Long>, IAvailabilityRepository {

}

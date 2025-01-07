package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.Availability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAAvailabilityRespository extends JpaRepository<Availability, Long>, IAvailabilityRepository {

}

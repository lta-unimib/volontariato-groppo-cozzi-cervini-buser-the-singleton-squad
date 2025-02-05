package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Primary
@Repository
public interface IAvailabilityRepository extends JpaRepository<Availability, Integer> {
    Optional<Availability> findById(Long id);
}

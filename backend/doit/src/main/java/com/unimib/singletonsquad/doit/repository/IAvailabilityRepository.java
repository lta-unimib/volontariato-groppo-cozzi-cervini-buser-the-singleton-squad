package com.unimib.singletonsquad.doit.repository;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Primary
@Repository
public interface IAvailabilityRepository {
    Availability save(Availability availability);
    Optional<Availability> findById(Long id);
    boolean existsById(Long id);
}

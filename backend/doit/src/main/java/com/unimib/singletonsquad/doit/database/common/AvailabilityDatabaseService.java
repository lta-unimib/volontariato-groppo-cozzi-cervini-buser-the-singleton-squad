package com.unimib.singletonsquad.doit.database.common;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import com.unimib.singletonsquad.doit.repository.IAvailabilityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@AllArgsConstructor
@Service
@Transactional
public class AvailabilityDatabaseService {

    private final IAvailabilityRepository availabilityRepository;

    public Availability save(Availability availability) {
        return this.availabilityRepository.save(availability);
    }

    public Optional<Availability> findById(Long id) {
        return this.availabilityRepository.findById(id);
    }
}

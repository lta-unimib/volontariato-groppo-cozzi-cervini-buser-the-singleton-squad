package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import com.unimib.singletonsquad.doit.repository.IAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AvailabilityService {

    @Autowired
    private IAvailabilityRepository availabilityRepository;

    public Availability save(Availability availability) {
        return this.availabilityRepository.save(availability);
    }

    public Optional<Availability> findById(Long id) {
        return this.availabilityRepository.findById(id);
    }

}

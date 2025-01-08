package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.Organization;
import com.unimib.singletonsquad.doit.domain.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.repository.IVolunteerRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class VolunteerRequestService {
    @Autowired
    IVolunteerRequestRepository repository;

    public VolunteerRequest save(VolunteerRequestDTO volunteerRequest) {
        VolunteerRequest volunteerRequestEntity = new VolunteerRequest();
        volunteerRequestEntity.setDetailedDescription(volunteerRequest.getDetailedDescription());
        volunteerRequestEntity.setTitle(volunteerRequest.getTitle());
        
        return repository.save(volunteerRequestEntity);
    }

    public Optional<VolunteerRequest> findRequestById(Long id) {
        return repository.findById((long) id);
    }
}

package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.repository.concrete_repository.IVolunteerRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class VolunteerRequestService {

    @Autowired
    IVolunteerRequestRepository repository;

    public VolunteerRequest save(VolunteerRequest volunteerRequest) {
        return repository.save(volunteerRequest);
    }

    public Optional<VolunteerRequest> findRequestById(Long id) {
        return repository.findById(id);
    }

    public void deleteRequestById(Long id) throws RecordNotFoundGeneralException {
        if (!repository.existsById(id)) {
            throw new RecordNotFoundGeneralException("VolunteerRequest not found with id " + id);
        }
        this.repository.deleteById(id);
    }

    public void updateRequest(VolunteerRequest volunteerRequest, Long id) throws RecordNotFoundGeneralException {
        if (!repository.existsById(id))
            throw new RecordNotFoundGeneralException("VolunteerRequest not found with id " + id);
        this.repository.save(volunteerRequest);
    }


    public VolunteerRequest getSpecificRequest(Long idRequest) {
        if (!repository.existsById(idRequest))
            throw new RecordNotFoundGeneralException("VolunteerRequest not found with id " + idRequest);
        return repository.findById(idRequest).isPresent() ? repository.findById(idRequest).get() : null;
    }
}

package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.repository.IVolunteerRequestRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
@Transactional
public class VolunteerRequestService {
    @Autowired
    IVolunteerRequestRepository repository;
    @Autowired
    DistanceCalculatorService distanceCalculatorService;

    public VolunteerRequest save(VolunteerRequest volunteerRequest) {
        return repository.save(volunteerRequest);
    }

    public Optional<VolunteerRequest> findRequestById(Long id) {
        return repository.findById((long) id);
    }

    public List<VolunteerRequest> matchVolunteer(Volunteer volunteer) {

        return null;
    }

    public double[] distances(List<VolunteerRequest> volunteerRequests, String city) {
        double[] distances = new double[volunteerRequests.size()];
        for (int i = 0; i < volunteerRequests.size(); i++) {
            distances[i] = distanceCalculatorService.calculateDistance(volunteerRequests.get(i).getCity(), city);
        }
        return distances;
    }

    public void deleteRequestById(Long id) {
        this.repository.deleteById(id);
    }

    public void updateRequest(VolunteerRequest volunteerRequest, Long id) throws Exception {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("VolunteerRequest not found with id " + volunteerRequest.getId());
        }

        this.repository.save(volunteerRequest);
    }


}

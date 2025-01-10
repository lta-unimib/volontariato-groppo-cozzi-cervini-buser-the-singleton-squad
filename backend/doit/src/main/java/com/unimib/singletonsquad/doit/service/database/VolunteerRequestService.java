package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.repository.IVolunteerRequestRepository;
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
    @Autowired
    DistanceCalculatorService distanceCalculatorService;

    public VolunteerRequest save(VolunteerRequestDTO volunteerRequest) {
        VolunteerRequest volunteerRequestEntity = new VolunteerRequest();
        volunteerRequestEntity.setDetailedDescription(volunteerRequest.getDetailedDescription());
        volunteerRequestEntity.setTitle(volunteerRequest.getTitle());

        return repository.save(volunteerRequestEntity);
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
}

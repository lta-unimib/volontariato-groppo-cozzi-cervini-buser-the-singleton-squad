package com.unimib.singletonsquad.doit.database.volunteer;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerPreferences;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.repository.concrete_repository.IVolunteerRequestRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.*;

@Service
@Transactional
@AllArgsConstructor
public class VolunteerRequestService {

    private final IVolunteerRequestRepository repository;

    public VolunteerRequest save(VolunteerRequest volunteerRequest) {
        return repository.save(volunteerRequest);
    }

    public Optional<VolunteerRequest> findRequestById(Long id) {
        return repository.findById(id);
    }

    public void deleteRequestById(Long id) throws RecordNotFoundGeneralException {
        validateRequestExists(id);
        repository.deleteById(id);
    }

    public void updateRequest(VolunteerRequest volunteerRequest, Long id) throws RecordNotFoundGeneralException {
        validateRequestExists(id);
        repository.save(volunteerRequest);
    }

    public VolunteerRequest getSpecificRequest(Long idRequest) {
        return repository.findById(idRequest)
                .orElseThrow(() -> new RecordNotFoundGeneralException(
                        "VolunteerRequest not found with id " + idRequest));
    }

    public List<VolunteerRequest> getAllRequestByEmail(String email) {
        return repository.findByOrganization_Email(email);
    }

    public List<VolunteerRequest> getAllRequest() {
        return repository.findAll();
    }

    private void validateRequestExists(Long id) {
        if (!repository.existsById(id)) {
            throw new RecordNotFoundGeneralException("VolunteerRequest not found with id " + id);
        }
    }

    public void getVolunteerRequestBasedOnPreferences(VolunteerPreferences volunteerPreferences) throws ExecutionException, InterruptedException {
        List<VolunteerRequest> requests = getAllRequest();
        int[] points = new int[requests.size()];

        for (int i = 0; i < points.length; i++) {
            VolunteerRequest request = requests.get(i);
            points[i] += volunteerPreferences.hasCategories(request.getVolunteerCategories()) ? 1 : 0;
            points[i] += volunteerPreferences.hasAvailability(request.getStartDateTime(), request.getEndDateTime()) ? 1 : 0;
            //TODO GEOSORTING
        }

        for (int point : points) {
            System.out.println(point);
        }
    }
}
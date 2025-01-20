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
        /*ExecutorService executor = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());

        // Creare e inviare i task
        Future<Integer>[] futures = new Future[requests.size()];
        for (int i = 0; i < requests.size(); i++) {
            final VolunteerRequest request = requests.get(i);
            futures[i] = executor.submit(() -> request.getMatchingPoint(volunteerPreferences));
        }

        // Raccogliere i risultati
        for (int i = 0; i < futures.length; i++) {
            points[i] = futures[i].get();
            System.out.println(points[i]);
        }
        executor.shutdown();*/

        for (int i = 0; i < points.length; i++) {
            points[i] = requests.get(i).getMatchingPoint(volunteerPreferences);
        }

        for (int i = 0; i < points.length; i++) {
            System.out.println(points[i]);
        }
    }
}
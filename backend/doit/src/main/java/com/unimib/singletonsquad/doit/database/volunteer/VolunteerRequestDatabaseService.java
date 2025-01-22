package com.unimib.singletonsquad.doit.database.volunteer;

import com.unimib.singletonsquad.doit.database.common.CityInfoDatabaseService;
import com.unimib.singletonsquad.doit.domain.common.CityInfo;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.repository.IVolunteerRequestRepository;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class VolunteerRequestDatabaseService {

    private final IVolunteerRequestRepository repository;
    private final CityInfoDatabaseService cityRepository;


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
        return repository.getAllRequest(LocalDateTime.now());
    }

    private void validateRequestExists(Long id) {
        if (!repository.existsById(id)) {
            throw new RecordNotFoundGeneralException("VolunteerRequest not found with id " + id);
        }
    }


    public CityInfo getCityInfo(@NotNull final String city) throws Exception {
        return this.cityRepository.getCityInfo(city);
    }

    public VolunteerRequest decreaseCapacity(VolunteerRequest volunteerRequest) {
        VolunteerRequest temp = this.getSpecificRequest(volunteerRequest.getId());
        temp.setCapacity(temp.getCapacity() -1);
        return this.repository.save(temp);
    }



}
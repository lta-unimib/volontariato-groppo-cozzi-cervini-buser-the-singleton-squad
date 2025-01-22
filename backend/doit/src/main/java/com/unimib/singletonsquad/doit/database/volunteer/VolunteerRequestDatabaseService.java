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

@Service
@Transactional
@AllArgsConstructor
public class VolunteerRequestDatabaseService {

    private final IVolunteerRequestRepository repository;
    private final CityInfoDatabaseService cityRepository;

    /// Save a Request Into the database
    public VolunteerRequest save(VolunteerRequest volunteerRequest) {
        return repository.save(volunteerRequest);
    }

    /// Delete a Request
    public void deleteRequestById(Long id) throws RecordNotFoundGeneralException {
        validateRequestExists(id);
        repository.deleteById(id);
    }

    /// Update a request
    public void updateRequest(VolunteerRequest volunteerRequest, Long id) throws RecordNotFoundGeneralException {
        validateRequestExists(id);
        repository.save(volunteerRequest);
    }


    public VolunteerRequest getSpecificRequest(Long idRequest) {
        return repository.findById(idRequest)
                .orElseThrow(() -> new RecordNotFoundGeneralException(
                        "VolunteerRequest not found with id " + idRequest));
    }

    /// Get all Request di un'organizzazone email
    public List<VolunteerRequest> getAllRequestOrganizationByEmail(String email) {
        return repository.findByOrganization_Email(email);
    }

    /// Get all request di un'organizzaione name
    public List<VolunteerRequest> getAllRequestOrganizationByName(String name) {
        return this.repository.findByOrganization_Name(name);
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

    /// getAllRequestRegistered
    public List<VolunteerRequest> getAllRequestRegistered(String email) {
        return this.repository.getAllRequestRegistered(LocalDateTime.now(), email);
    }

    /// getAllRequestNotVoted
    public List<VolunteerRequest> getAllRequestNotVoted(@NotNull String volunteerEmail) {
        return this.repository.getAllRequestNotVoted(LocalDateTime.now(), volunteerEmail);
    }

    /// getALlRequestVoted
    public List<VolunteerRequest> getALlRequestVoted(@NotNull String volunteerEmail) {
        return this.repository.getALlRequestVoted(LocalDateTime.now(), volunteerEmail);
    }
}
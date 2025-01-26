package com.unimib.singletonsquad.doit.database.volunteer;

import com.unimib.singletonsquad.doit.database.common.CityInfoDatabaseService;
import com.unimib.singletonsquad.doit.domain.common.CityInfo;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.send.ShortVolunteerDTO;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
import com.unimib.singletonsquad.doit.repository.IVolunteerRequestRepository;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@AllArgsConstructor
public class VolunteerRequestDatabaseService {

    private final IVolunteerRequestRepository repository;
    private final CityInfoDatabaseService cityRepository;
    private static final String ERROR_MESSAGE_EMAIL = "VolunteerRequest not found with id ";

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

    /// Get a specific request
    public VolunteerRequest getSpecificRequest(Long idRequest) {
        return repository.findById(idRequest)
                .orElseThrow(() -> new RecordNotFoundGeneralException(
                        ERROR_MESSAGE_EMAIL + idRequest));
    }

    /// get specific request and check the date
    public VolunteerRequest getRequestForAddingNewOffer(Long idRequest) {
        VolunteerRequest volunteerRequest = getSpecificRequest(idRequest);
        if(volunteerRequest.getEndDateTime().isBefore(LocalDateTime.now()))
            throw new IllegalArgumentException("End date is after start date");
        return volunteerRequest;
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
            throw new RecordNotFoundGeneralException( ERROR_MESSAGE_EMAIL + id);
        }
    }


    public CityInfo getCityInfo(@NotNull final String city) throws UnsupportedEncodingException, InterruptedException {
        return this.cityRepository.getCityInfo(city);
    }

    public VolunteerRequest decreaseCapacity(VolunteerRequest volunteerRequest) {
        VolunteerRequest temp = this.getSpecificRequest(volunteerRequest.getId());
        temp.setCapacity(temp.getCapacity() -1);
        return this.repository.save(temp);
    }

    /// get All request not registered
    public List<VolunteerRequest> getAllRequestNotRegistered(String email) {
        return this.repository.getAllRequestNotRegistered(LocalDateTime.now(), email);
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


    public VolunteerRequest existsVolunteerRequestByVolunteer(Long idRequest, Volunteer volunteer) {
        return this.repository.getSpecificVolunteerRequestFeedback(volunteer.getId(), idRequest, LocalDateTime.now()).orElseThrow(
                () -> new RecordNotFoundGeneralException( ERROR_MESSAGE_EMAIL + idRequest +" while existsVolunteerRequestByVolunteer"));

    }

    public List<Volunteer> getAllVolunteerByRequest(Long idRequest) {
        return this.repository.getAllVolunteerByRequest(idRequest);
    }


    /// GET ALL REQUEST LIST
    public Map< VolunteerRequest, List<Volunteer>> getRequestListAllEvents(Organization organization) {
        String orgEmail = organization.getEmail();
        List<VolunteerRequest> temp = this.getAllRequestOrganizationByEmail(orgEmail);
        Map< VolunteerRequest, List<Volunteer>> requestListAllEvents = new HashMap<>();
        for (VolunteerRequest volunteerRequest : temp) {
            requestListAllEvents.put(volunteerRequest, getAllVolunteerByRequest(volunteerRequest.getId()));
        }
        return requestListAllEvents;
    }

    public List<ShortVolunteerDTO> getRequestSpecificiListAllEvents(Long idRequest) {
        List<ShortVolunteerDTO> requestListAllEvents = new ArrayList<>();
        for (Volunteer volunteer : getAllVolunteerByRequest(idRequest)) {
            requestListAllEvents.add(VolunteerMapper.toShortVolunteerInfoDTO(volunteer));
        }
        return requestListAllEvents;
    }


}
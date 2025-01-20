package com.unimib.singletonsquad.doit.service.request;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.mappers.VolunteerRequestMapper;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class VolunteerRequestControllerService {
    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;
    private final VolunteerRequestMapper volunteerRequestMapper;
    private final VolunteerRequestMatchingService volunteerRequestMatchingService;
    private final VolunteerDatabaseService volunteerDatabaseService;


    public void deleteVolunteerRequest(final Long requestId) throws Exception {
        this.volunteerRequestDatabaseService.deleteRequestById(requestId);
    }

    public void updateVolunteerRequest(final VolunteerRequestDTO volunteerRequestDTO, final Long id, final String email)
            throws Exception {
            VolunteerRequest temp = this.volunteerRequestMapper.updateVolunteerRequest(volunteerRequestDTO, id, email);
            this.volunteerRequestDatabaseService.updateRequest(temp, id);
    }

    public void createVolunteerRequest(final VolunteerRequestDTO volunteerRequestDTO, String email)
            throws Exception {
            VolunteerRequest temp = this.volunteerRequestMapper.createRequestVolunteer(volunteerRequestDTO, email);
            this.volunteerRequestDatabaseService.save(temp);
    }

    public VolunteerRequest getSpecificRequest(Long idRequest) throws Exception {
        return this.volunteerRequestDatabaseService.getSpecificRequest(idRequest);
    }

    public List<VolunteerRequest> getAllRequestByOrganizationEmail(String email) {
        return this.volunteerRequestDatabaseService.getAllRequestByEmail(email);
    }

    public List<VolunteerRequest> getAllRequest() {
        return this.volunteerRequestDatabaseService.getAllRequest();
    }

    public List<VolunteerRequest> getAllRequestSorted(@NotNull final String volunteerEmail)
            throws Exception{
        Optional<Volunteer> volunteer = volunteerDatabaseService.findVolunteerByEmail(volunteerEmail);
        if(volunteer.isEmpty())
            throw new RecordNotFoundGeneralException(String.format("Volunteer %s not found", volunteerEmail));


        return this.volunteerRequestMatchingService.getVolunteerRequestBasedOnPreferences(volunteer.get());

    }
}

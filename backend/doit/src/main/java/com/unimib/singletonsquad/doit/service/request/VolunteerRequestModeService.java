package com.unimib.singletonsquad.doit.service.request;

import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerRequestDatabaseService;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestSendDTO;
import com.unimib.singletonsquad.doit.mappers.VolunteerRequestMapper;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class VolunteerRequestModeService {

    private final VolunteerRequestDatabaseService volunteerRequestDatabaseService;
    private final VolunteerDatabaseService volunteerDatabaseService;
    private final VolunteerRequestMatchingService volunteerRequestMatchingService;

    public List<VolunteerRequestSendDTO> getAllRequestNotRegistered(@NotNull final String volunteerEmail) throws Exception {
        List<VolunteerRequest> volunteerRequestToBeSorted = this.volunteerRequestDatabaseService.getAllRequestNotRegistered(volunteerEmail);
        Volunteer volunteer= this.volunteerDatabaseService.findVolunteerByEmail(volunteerEmail);
        List<VolunteerRequest> volunteerRequestSorted= this.volunteerRequestMatchingService.getVolunteerRequestBasedOnPreferences(volunteer, volunteerRequestToBeSorted);
        return createRequestSendDTOList(volunteerRequestSorted);
    }

    public List<VolunteerRequestSendDTO> getAllRequestRegistered(@NotNull final String volunteerEmail) throws Exception {
        List<VolunteerRequest> volunteerRequests = this.volunteerRequestDatabaseService.getAllRequestRegistered(volunteerEmail);
        return createRequestSendDTOList(volunteerRequests);
    }

    public List<VolunteerRequestSendDTO> getAllRequestNotVoted(@NotNull final String volunteerEmail) throws Exception {
        List<VolunteerRequest> volunteerRequests = this.volunteerRequestDatabaseService.getAllRequestNotVoted(volunteerEmail);
        return createRequestSendDTOList(volunteerRequests);
    }

    public List<VolunteerRequestSendDTO> getAllRequestVoted(@NotNull final String volunteerEmail) throws Exception {
        List<VolunteerRequest> volunteerRequests = this.volunteerRequestDatabaseService.getALlRequestVoted(volunteerEmail);
        return createRequestSendDTOList(volunteerRequests);
    }


    /// ============ SUPPORT METHOD ==========
    /// TODO Mettere questo metodo in un Mapper DTO VolunteerRequest
    private List<VolunteerRequestSendDTO> createRequestSendDTOList(final List<VolunteerRequest> volunteerRequest) {
        List<VolunteerRequestSendDTO> volunteerRequestDTOS = new ArrayList<>();
        for (VolunteerRequest volunteersingle : volunteerRequest) {
            volunteerRequestDTOS.add(VolunteerRequestMapper.mapToVolunteerRequestDTO(volunteersingle));
        }
        return volunteerRequestDTOS;
    }
}
package com.unimib.singletonsquad.doit.service.request;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.mappers.VolunteerRequestMapper;
import com.unimib.singletonsquad.doit.service.database.VolunteerRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VolunteerRequestControllerService {

    @Autowired
    private VolunteerRequestService volunteerRequestService;
    @Autowired
    private VolunteerRequestMapper volunteerRequestMapper;


    public void deleteVolunteerRequest(final Long requestId) throws Exception {
        this.volunteerRequestService.deleteRequestById(requestId);
    }

    public void updateVolunteerRequest(final VolunteerRequestDTO volunteerRequestDTO, final Long id, final String email)
            throws Exception {
            VolunteerRequest temp = this.volunteerRequestMapper.updateVolunteerRequest(volunteerRequestDTO, id, email);
            this.volunteerRequestService.updateRequest(temp, id);
    }

    public void createVolunteerRequest(final VolunteerRequestDTO volunteerRequestDTO, String email)
            throws Exception {
            VolunteerRequest temp = this.volunteerRequestMapper.createRequestVolunteer(volunteerRequestDTO, email);
            this.volunteerRequestService.save(temp);
    }

    public VolunteerRequest getSpecificRequest(Long idRequest) throws Exception {
        return this.volunteerRequestService.getSpecificRequest(idRequest);
    }

    public List<VolunteerRequest> getAllRequestByOrganizationEmail(String email) {
        return this.volunteerRequestService.getAllRequestByEmail(email);
    }
    public List<VolunteerRequest> getAllRequest() {
        return this.volunteerRequestService.getAllRequest();
    }


}

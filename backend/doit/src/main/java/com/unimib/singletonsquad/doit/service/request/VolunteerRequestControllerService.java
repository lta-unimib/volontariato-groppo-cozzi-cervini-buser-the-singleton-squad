package com.unimib.singletonsquad.doit.service.request;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.mappers.VolunteerRequestMapper;
import com.unimib.singletonsquad.doit.service.database.VolunteerRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VolunteerRequestControllerService {

    @Autowired
    private VolunteerRequestService volunteerRequestService;
    @Autowired
    private VolunteerRequestMapper volunteerRequestMapper;


    public void deleteVolunteerRequest(final Long requestId) throws Exception {
        this.volunteerRequestService.deleteRequestById(requestId);
    }

    public void updateVolunteerRequest(final VolunteerRequestDTO volunteerRequestDTO, final Long id)
            throws Exception {
            VolunteerRequest temp = this.volunteerRequestMapper.createRequestVolunteer(volunteerRequestDTO, id);
            this.volunteerRequestService.updateRequest(temp, id);
    }

    public void createVolunteerRequest(final VolunteerRequestDTO volunteerRequestDTO)
            throws Exception {
            VolunteerRequest temp = this.volunteerRequestMapper.createRequestVolunteer(volunteerRequestDTO);
            this.volunteerRequestService.save(temp);
    }

    public VolunteerRequest getSpecificRequest(Long idRequest) throws Exception {
        VolunteerRequest temp = this.volunteerRequestService.getSpecificRequest(idRequest);
        return temp;
    }
}

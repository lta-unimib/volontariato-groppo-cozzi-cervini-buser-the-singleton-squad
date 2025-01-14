package com.unimib.singletonsquad.doit.service.request;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.mappers.VolunteerRequestMapper;
import com.unimib.singletonsquad.doit.service.database.VolunteerRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class VolunteerRequestControllerService {

    @Autowired
    private VolunteerRequestService volunteerRequestService;
    @Autowired
    private VolunteerRequestMapper volunteerRequestMapper;


    public void deleteVolunteerRequest(final Long requestId) throws Exception {
        try {
            this.volunteerRequestService.deleteRequestById(requestId);
        }catch (Exception e) {
            throw new Exception(e);
        }
    }

    public void updateVolunteerRequest(final VolunteerRequestDTO volunteerRequestDTO, final Long id)
            throws Exception {
        try{
            VolunteerRequest temp = this.volunteerRequestMapper.createRequestVolunteer(volunteerRequestDTO, id);
            this.volunteerRequestService.updateRequest(temp, id);
        }catch (Exception e) {
            throw new Exception(e);
        }
    }

    public void createVolunteerRequest(final VolunteerRequestDTO volunteerRequestDTO)
            throws Exception {
        try{
            VolunteerRequest temp = new VolunteerRequest();
            temp = this.volunteerRequestMapper.createRequestVolunteer(volunteerRequestDTO);
            this.volunteerRequestService.save(temp);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

}

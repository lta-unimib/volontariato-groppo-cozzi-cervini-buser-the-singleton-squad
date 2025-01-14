package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VolunteerRequestMapper {

    @Autowired
    private AddressMapper addressMapper;

    public VolunteerRequest createRequestVolunteer(VolunteerRequestDTO request, @Nullable Long id) {
        VolunteerRequest volunteerRequest = new VolunteerRequest();
        volunteerRequest.setId(id);
        return volunteerRequest(request, volunteerRequest);
    }
    public VolunteerRequest createRequestVolunteer(VolunteerRequestDTO request) {
        VolunteerRequest volunteerRequest = new VolunteerRequest();

        return volunteerRequest(request, volunteerRequest);
    }

    private VolunteerRequest volunteerRequest(VolunteerRequestDTO request, VolunteerRequest volunteerRequest) {
        volunteerRequest.setDetailedDescription(request.getDetailedDescription());
        volunteerRequest.setCapacity(request.getVolunteerCapacity());
        volunteerRequest.setAddress(this.addressMapper.createAddress(request.getAddress()));
        volunteerRequest.setVolunteerType(request.getVolunteerType());
        volunteerRequest.setStartDateTime(request.getStartDate());
        volunteerRequest.setEndDateTime(request.getEndDate());
        return volunteerRequest;
    }

}

package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.service.database.OrganizationService;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class VolunteerRequestMapper {

    @Autowired
    private AddressMapper addressMapper;
    @Autowired
    private OrganizationService organizationService;


    public VolunteerRequest createRequestVolunteer(VolunteerRequestDTO request, @Nullable Long id) throws Exception {
        VolunteerRequest volunteerRequest = new VolunteerRequest();
        volunteerRequest.setId(id);
        return volunteerRequest(request, volunteerRequest);
    }

    public VolunteerRequest createRequestVolunteer(VolunteerRequestDTO request) throws Exception {
        VolunteerRequest volunteerRequest = new VolunteerRequest();

        return volunteerRequest(request, volunteerRequest);
    }

    private VolunteerRequest volunteerRequest(VolunteerRequestDTO request, VolunteerRequest volunteerRequest) throws Exception {
        volunteerRequest.setDetailedDescription(request.getDetailedDescription());
        volunteerRequest.setCapacity(request.getVolunteerCapacity());
        volunteerRequest.setAddress(this.addressMapper.createAddress(request.getAddress()));
        volunteerRequest.setVolunteerType(request.getVolunteerType());
        volunteerRequest.setStartDateTime(request.getStartDate());
        volunteerRequest.setEndDateTime(request.getEndDate());
        volunteerRequest.setTitle(request.getTitle());
        volunteerRequest.setOrganization(this.getOrganization(request.getOrgId()));
        return volunteerRequest;
    }

    private Organization getOrganization(Long idOrganization) throws Exception {
        System.out.println("DEBUG ==> " + idOrganization);
        if(!this.organizationService.findOrganizationById(idOrganization).isPresent())
            throw new Exception("Organization not found");
        return this.organizationService.findOrganizationById(idOrganization).get();
    }

}

package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.database.organization.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VolunteerRequestMapper {

    @Autowired
    private AddressMapper addressMapper;

    @Autowired
    private OrganizationService organizationService;

    public VolunteerRequest updateVolunteerRequest(VolunteerRequestDTO requestDTO, Long requestId, String organizationEmail)
            throws Exception {
        VolunteerRequest volunteerRequest = new VolunteerRequest();
        volunteerRequest.setId(requestId);
        return mapVolunteerRequestFields(requestDTO, volunteerRequest, organizationEmail);
    }

    public VolunteerRequest createRequestVolunteer(VolunteerRequestDTO requestDTO, String organizationEmail)
            throws Exception {
        VolunteerRequest volunteerRequest = new VolunteerRequest();
        return mapVolunteerRequestFields(requestDTO, volunteerRequest, organizationEmail);
    }

    private VolunteerRequest mapVolunteerRequestFields(VolunteerRequestDTO requestDTO,
                                                       VolunteerRequest volunteerRequest,
                                                       String organizationEmail) throws Exception {
        volunteerRequest.setDetailedDescription(requestDTO.getDetailedDescription());
        volunteerRequest.setCapacity(requestDTO.getVolunteerCapacity());
        volunteerRequest.setAddress(addressMapper.createAddress(requestDTO.getAddress()));
        volunteerRequest.setVolunteerType(requestDTO.getVolunteerType());
        volunteerRequest.setStartDateTime(requestDTO.getStartDate());
        volunteerRequest.setEndDateTime(requestDTO.getEndDate());
        volunteerRequest.setTitle(requestDTO.getTitle());
        volunteerRequest.setOrganization(getOrganizationByEmail(organizationEmail));
        volunteerRequest.setVolunteerCategories(requestDTO.getCategories());

        return volunteerRequest;
    }

    private Organization getOrganization(Long organizationId) throws Exception {
        return organizationService.findOrganizationById(organizationId)
                .orElseThrow(() -> new Exception("Organization not found with ID: " + organizationId));
    }

    private Organization getOrganizationByEmail(String email) throws Exception {
        return organizationService.findOrganizationByEmail(email)
                .orElseThrow(() -> new Exception("Organization not found with email: " + email));
    }
}
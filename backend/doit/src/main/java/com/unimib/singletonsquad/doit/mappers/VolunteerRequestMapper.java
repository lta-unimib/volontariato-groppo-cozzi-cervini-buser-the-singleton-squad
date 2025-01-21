package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class VolunteerRequestMapper {

    private final AddressMapper addressMapper;
    private final OrganizationDatabaseService organizationService;


    /** FIXME PER IL REFATCOTING PASSARE DIRETTAMENTE LE ORGANIZAZZIONI E NON LE EMAIL !!!!w
     */

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
        volunteerRequest.setVolunteerType(requestDTO.getVolunteerType().getFirst());
        volunteerRequest.setStartDateTime(requestDTO.getStartDate());
        volunteerRequest.setEndDateTime(requestDTO.getEndDate());
        volunteerRequest.setTitle(requestDTO.getTitle());
        volunteerRequest.setVolunteerOffer(new ArrayList<>());
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
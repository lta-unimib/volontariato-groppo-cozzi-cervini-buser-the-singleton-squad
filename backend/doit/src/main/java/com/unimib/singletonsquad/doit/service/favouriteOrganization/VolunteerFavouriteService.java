package com.unimib.singletonsquad.doit.service.favouriteOrganization;

import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.received.OrganizationDTO;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class VolunteerFavouriteService {

    private final VolunteerDatabaseService volunteerDatabaseService;
    private final OrganizationDatabaseService organizationDatabaseService;

    public void addFavouriteOrganization(String email, String organizationName){
        Volunteer volunteer = volunteerDatabaseService.findVolunteerByEmail(email);
        Organization organization = organizationDatabaseService.findOrganizationByName(organizationName);
        volunteer.addOrganizationToFavourite(organization);
        this.volunteerDatabaseService.save(volunteer);
    }

    public void revokeFavouriteOrganization(String email, String organizationName) {
        Volunteer volunteer = this.volunteerDatabaseService.findVolunteerByEmail(email);
        Organization organization = organizationDatabaseService.findOrganizationByName(organizationName);
        volunteer.removeOrganizationFromFavourite(organization);
        this.volunteerDatabaseService.save(volunteer);
    }

    public List<OrganizationDTO> getFavouriteOrganizations(String email){
        Volunteer volunteer = this.volunteerDatabaseService.findVolunteerByEmail(email);
        List<OrganizationDTO> favouriteOrganizations = new ArrayList<>();
        for (Organization organization : volunteer.getFavoriteOrganizations()) {
            favouriteOrganizations.add(OrganizationMapper.mapToOrganizationDTO(organization));
        }
        return favouriteOrganizations;
    }

}

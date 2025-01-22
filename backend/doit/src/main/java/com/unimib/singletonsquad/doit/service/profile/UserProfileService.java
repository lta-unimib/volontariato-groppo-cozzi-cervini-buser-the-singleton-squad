package com.unimib.singletonsquad.doit.service.profile;

import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.recived.OrganizationDTO;
import com.unimib.singletonsquad.doit.dto.recived.VolunteerDTO;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserProfileService {

    /**
        PER IL REFACROTING FARE UNA CLASSE ASTRATTA CHE
        IMPLEMENTA I METODI COMUNI CHE SONO RIDEFINITI NELLE
        CLASSI CONCRETE
     */

    private final VolunteerDatabaseService volunteerDatabaseService;
    private final OrganizationDatabaseService organizationDatabaseService;
    private final VolunteerMapper volunteerMapper;
    private final OrganizationMapper organizationMapper;


    public VolunteerDTO getVolunteerInfoById(Long idVolunteer) throws Exception {
        Volunteer volunteer = this.volunteerDatabaseService.findVolunteerById(idVolunteer);
        return VolunteerMapper.toVolunteerDTO(volunteer);

    }

    public Organization getOrganizationByEmail(String email) throws Exception {
        return this.organizationDatabaseService.findOrganizationByEmail(email);
    }



    public void updateVolunteerInfo(String email, @NotNull VolunteerDTO volunteer) throws Exception {
        Volunteer volunteerData = this.volunteerDatabaseService.findVolunteerByEmail(email);
        Volunteer tobesaved = this.volunteerMapper.updateVolunteer(volunteer, volunteerData);
        this.volunteerDatabaseService.save(tobesaved);

    }
    public void updateOrganizationInfo(String email, @NotNull OrganizationDTO organization) throws Exception {
        Organization organizationData = this.organizationDatabaseService.findOrganizationByEmail(email);
        Organization tobeSaved = this.organizationMapper.updateOrganizationInfos(organizationData, organization);
        this.organizationDatabaseService.save(tobeSaved);
    }

    public void deleteVolunteer(String email) {
        this.volunteerDatabaseService.findVolunteerByEmail(email);
        this.volunteerDatabaseService.deleteVolunteer(email);
    }
    public void deleteOrganization(String email) {
        this.organizationDatabaseService.findOrganizationByEmail(email);
        this.organizationDatabaseService.deleteOrganization(email);
    }

    public void updateVolunteerPassword(String email, String password) throws Exception {
        Volunteer volunteer = volunteerDatabaseService.findVolunteerByEmail(email);
            volunteer.setPassword(password);
            this.volunteerDatabaseService.save(volunteer);
        }

    public void updateOrganizationPassword(String email, String password) throws Exception {
           Organization organization = this.organizationDatabaseService.findOrganizationByEmail(email);
            organization.setPassword(password);
           this.organizationDatabaseService.save(organization);
        }

    public Organization getOrganizationInfoById(Long id) {
        return this.organizationDatabaseService.findOrganizationById(id);
    }

    public Organization getOrganizationByName(String name) {
        return this.organizationDatabaseService.findOrganizationByName(name);
    }

    public Volunteer getVolunteerInfoByEmail(String email) {
        return this.volunteerDatabaseService.findVolunteerByEmail(email);
    }
}


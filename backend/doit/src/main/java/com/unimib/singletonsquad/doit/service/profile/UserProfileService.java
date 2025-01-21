package com.unimib.singletonsquad.doit.service.profile;

import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.OrganizationDTO;
import com.unimib.singletonsquad.doit.dto.VolunteerDTO;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

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


    public VolunteerDTO getVolunteerInfo(String email) throws Exception {
        Optional<Volunteer> volunteer = this.volunteerDatabaseService.findVolunteerByEmail(email);
        if(volunteer.isEmpty())
            throw new RecordNotFoundGeneralException("Volunteer not found");
        return VolunteerMapper.toVolunteerDTO(volunteer.get());

    }


    public Organization getOrganizationInfo(String email) {
        Optional<Organization> organization = this.organizationDatabaseService.findOrganizationByEmail(email);
        if(organization.isEmpty())
            throw new RecordNotFoundGeneralException("Organization not found");
        return organization.get();
    }


    public void updateVolunteerInfo(String email, @NotNull VolunteerDTO volunteer) throws Exception {
        Optional<Volunteer> volunteerData = this.volunteerDatabaseService.findVolunteerByEmail(email);
        if(volunteerData.isEmpty())
            throw new RecordNotFoundGeneralException("Volunteer not exists");
        Volunteer tobesaved = this.volunteerMapper.updateVolunteer(volunteer, volunteerData.get());
        this.volunteerDatabaseService.save(tobesaved);

    }
    public void updateOrganizationInfo(String email, @NotNull OrganizationDTO organization) throws Exception {
        Optional<Organization> organizationData = this.organizationDatabaseService.findOrganizationByEmail(email);
        if(organizationData.isEmpty())
            throw new RecordNotFoundGeneralException("Organization not exists");
        Organization tobeSaved = this.organizationMapper.updateOrganizationInfos(organizationData.get(), organization);
        this.organizationDatabaseService.save(tobeSaved);
    }

    public void deleteVolunteer(String email) {
        Optional<Volunteer> volunteerData = this.volunteerDatabaseService.findVolunteerByEmail(email);
        if(volunteerData.isEmpty())
            throw new RecordNotFoundGeneralException("Volunteer not exists");
        this.volunteerDatabaseService.deleteVolunteer(email);
    }
    public void deleteOrganization(String email) {
        Optional<Organization> organizationData = this.organizationDatabaseService.findOrganizationByEmail(email);
        if(organizationData.isEmpty())
            throw new RecordNotFoundGeneralException("Organization not exists");
        this.organizationDatabaseService.deleteOrganization(email);
    }
}
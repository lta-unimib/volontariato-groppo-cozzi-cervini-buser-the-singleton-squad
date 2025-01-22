package com.unimib.singletonsquad.doit.service.profile;

import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.recived.OrganizationDTO;
import com.unimib.singletonsquad.doit.dto.recived.VolunteerDTO;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
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


    public VolunteerDTO getVolunteerInfo(Long idVolunteer) throws Exception {
        Optional<Volunteer> volunteer = this.volunteerDatabaseService.findVolunteerById(idVolunteer);
        if(volunteer.isEmpty())
            throw new RecordNotFoundGeneralException("Volunteer not found");
        return VolunteerMapper.toVolunteerDTO(volunteer.get());

    }


    public Organization getOrganizationInfo(Long idOrganization) {
        Optional<Organization> organization = this.organizationDatabaseService.findOrganizationById(idOrganization);
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

    public void updateVolunteerPassword(String email, String password) throws Exception {
        Optional<Volunteer> volunteerOptional = volunteerDatabaseService.findVolunteerByEmail(email);
        if(volunteerOptional.isEmpty()) {
            throw new RecordNotFoundGeneralException("Volunteer not found");
        } else {
            Volunteer volunteer = volunteerOptional.get();
            volunteer.setPassword(password);
            this.volunteerDatabaseService.save(volunteer);
        }
    }

    public void updateOrganizationPassword(String email, String password) throws Exception {
        Optional<Organization> organizationOptional = organizationDatabaseService.findOrganizationByEmail(email);
        if(organizationOptional.isEmpty()) {
            throw new RecordNotFoundGeneralException("Volunteer not found");
        } else {
           Organization organization = organizationOptional.get();
            organization.setPassword(password);
           this.organizationDatabaseService.save(organization);
        }
    }
}

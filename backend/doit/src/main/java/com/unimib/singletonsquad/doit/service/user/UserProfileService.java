package com.unimib.singletonsquad.doit.service.user;

import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.database.volunteer.VolunteerDatabaseService;
import com.unimib.singletonsquad.doit.domain.common.User;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.received.OrganizationDTO;
import com.unimib.singletonsquad.doit.dto.received.VolunteerDTO;
import com.unimib.singletonsquad.doit.exception.auth.InvalidRoleGeneralException;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.mappers.VolunteerMapper;
import com.unimib.singletonsquad.doit.utils.authentication.UserRole;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserProfileService {

    private final VolunteerDatabaseService volunteerDatabaseService;
    private final OrganizationDatabaseService organizationDatabaseService;
    private final VolunteerMapper volunteerMapper;
    private final OrganizationMapper organizationMapper;
    private static final String ERROR_MESSAGE_EMAIL = "Unsupported user role";

    public User getUserInfoById(Long id, UserRole role) throws InvalidRoleGeneralException {
        switch (role) {
            case VOLUNTEER:
                return this.volunteerDatabaseService.findVolunteerById(id);
            case ORGANIZATION:
                return this.organizationDatabaseService.findOrganizationById(id);
            default:
                throw new InvalidRoleGeneralException(ERROR_MESSAGE_EMAIL);
        }
    }

    public User getUserByEmail(String email, UserRole role) throws InvalidRoleGeneralException {
        switch (role) {
            case VOLUNTEER:
                return this.volunteerDatabaseService.findVolunteerByEmail(email);
            case ORGANIZATION:
                return this.organizationDatabaseService.findOrganizationByEmail(email);
            default:
                throw new InvalidRoleGeneralException(ERROR_MESSAGE_EMAIL);
        }
    }

    public User getUserByName(String username, UserRole role) throws InvalidRoleGeneralException {
        if(role == UserRole.VOLUNTEER)
                return this.organizationDatabaseService.findOrganizationByName(username);
        else if(role == UserRole.ORGANIZATION)
                throw new InvalidRoleGeneralException(ERROR_MESSAGE_EMAIL);
        else
            throw new InvalidRoleGeneralException(ERROR_MESSAGE_EMAIL);
    }


    public void updateUserPassword(String email, String password, UserRole role) throws InvalidRoleGeneralException {
        switch (role) {
            case VOLUNTEER:
                Volunteer volunteer = this.volunteerDatabaseService.findVolunteerByEmail(email);
                volunteer.setPassword(password);
                this.volunteerDatabaseService.save(volunteer);
                break;
            case ORGANIZATION:
                Organization organization = this.organizationDatabaseService.findOrganizationByEmail(email);
                organization.setPassword(password);
                this.organizationDatabaseService.save(organization);
                break;
            default:
                throw new InvalidRoleGeneralException(ERROR_MESSAGE_EMAIL);
        }
    }

    public void updateUserInfo(String email, @NotNull Object dto, UserRole role) throws Exception {
        switch (role) {
            case VOLUNTEER:
                VolunteerDTO volunteerDTO = (VolunteerDTO) dto;
                Volunteer volunteerData = this.volunteerDatabaseService.findVolunteerByEmail(email);
                Volunteer toBeSaved = this.volunteerMapper.updateVolunteer(volunteerDTO, volunteerData);
                this.volunteerDatabaseService.save(toBeSaved);
                break;
            case ORGANIZATION:
                OrganizationDTO organizationDTO = (OrganizationDTO) dto;
                Organization organizationData = this.organizationDatabaseService.findOrganizationByEmail(email);
                Organization toBeSavedOrg = this.organizationMapper.updateOrganizationInfos(organizationData, organizationDTO);
                this.organizationDatabaseService.save(toBeSavedOrg);
                break;
            default:
                throw new InvalidRoleGeneralException(ERROR_MESSAGE_EMAIL);
        }
    }

    public void deleteUser(String email, UserRole role) {
        switch (role) {
            case VOLUNTEER:
                this.volunteerDatabaseService.deleteVolunteer(email);
                break;
            case ORGANIZATION:
                this.organizationDatabaseService.deleteOrganization(email);
                break;
            default:
                throw new InvalidRoleGeneralException(ERROR_MESSAGE_EMAIL);
        }
    }

}

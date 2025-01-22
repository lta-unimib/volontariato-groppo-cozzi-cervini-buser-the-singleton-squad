package com.unimib.singletonsquad.doit.database.volunteer;

import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.dto.recived.OrganizationDTO;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.mappers.OrganizationMapper;
import com.unimib.singletonsquad.doit.repository.IOrganizationRepository;
import com.unimib.singletonsquad.doit.repository.IVolunteerRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class VolunteerDatabaseService {

    private final IVolunteerRepository volunteerRepository;
    private final OrganizationDatabaseService organizationDatabaseService;
    private final PasswordEncoder passwordEncoder;

    public Optional<Volunteer> findVolunteerById(long id) {
        return volunteerRepository.findById(id);
    }

    public Volunteer findVolunteerByEmail(String email) {
        return volunteerRepository.findByEmail(email).orElseThrow( () -> {throw new RecordNotFoundGeneralException("Volunteer not found");});
    }

    public Volunteer save(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }

    public boolean authenticateVolunteer(String email, String rawPassword) {
        Optional<Volunteer> volunteerOptional = volunteerRepository.findByEmail(email);
        if (volunteerOptional.isPresent()) {
            Volunteer volunteer = volunteerOptional.get();
            return passwordEncoder.matches(rawPassword, volunteer.getPassword());
        } else {
            return false;
        }
    }

    public void deleteVolunteer(String email) {
        this.volunteerRepository.deleteByEmail(email);
    }

    public List<OrganizationDTO> getFavouriteOrganizations(String email) {
        Optional<Volunteer> volunteer = volunteerRepository.findByEmail(email);
        if(volunteer.isEmpty()) {
            throw new RecordNotFoundGeneralException("Volunteer not found");
        }
        List<OrganizationDTO> favouriteOrganizations = new ArrayList<>();
        for (Organization organization : volunteer.get().getFavoriteOrganizations()) {
            favouriteOrganizations.add(OrganizationMapper.mapToOrganizationDTO(organization));
        }
        return favouriteOrganizations;
    }

    public void revokeFavouriteOrganization(String email, String organizationName) {
        Optional<Volunteer>  volunteerOptional= volunteerRepository.findByEmail(email);
        if(volunteerOptional.isEmpty()) {
            throw new RecordNotFoundGeneralException("Volunteer not found");
        }
        Optional<Organization> organization = organizationDatabaseService.getOrganizationByName(organizationName);
        if(organization.isPresent()) {
            volunteerOptional.get().removeOrganizationFromFavourite(organization.get());
            volunteerRepository.save(volunteerOptional.get());
        }
    }

    public void addFavouriteOrganization(String email, String organizationName) {
        Optional<Volunteer>  volunteerOptional= volunteerRepository.findByEmail(email);
        if(volunteerOptional.isEmpty()) {
            throw new RecordNotFoundGeneralException("Volunteer not found");
        }
        Optional<Organization> organization = organizationDatabaseService.getOrganizationByName(organizationName);
        if(organization.isPresent()) {
            volunteerOptional.get().addOrganizationToFavourite(organization.get());
            volunteerRepository.save(volunteerOptional.get());
        }
    }
}

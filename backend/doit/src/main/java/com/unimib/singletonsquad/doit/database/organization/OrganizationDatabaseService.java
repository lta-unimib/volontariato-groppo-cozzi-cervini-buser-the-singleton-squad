package com.unimib.singletonsquad.doit.database.organization;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.exception.resource.RecordNotFoundGeneralException;
import com.unimib.singletonsquad.doit.repository.IOrganizationRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class OrganizationDatabaseService {
    private final IOrganizationRepository organizationRepository;
    private final PasswordEncoder passwordEncoder;

    public Organization save(Organization organization) {
        return organizationRepository.save(organization);
    }

    public Organization findOrganizationById(Long id) {
        return organizationRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundGeneralException("No organization found for ID: " + id));
    }

    public Organization findOrganizationByName(String organizationName) {
        return Optional.ofNullable(organizationRepository.findByName(organizationName))
                .orElseThrow(() -> new RecordNotFoundGeneralException("No organization found with name: " + organizationName));
    }

    public Organization findOrganizationByEmail(String email) {
        return organizationRepository.findByEmail(email)
                .orElseThrow(() -> new RecordNotFoundGeneralException("No organization found for email: " + email));
    }

    public boolean authenticateOrganization(String email, String rawPassword) {
        Organization organization = organizationRepository.findByEmail(email)
                .orElseThrow(() -> new RecordNotFoundGeneralException("No organization found for email: " + email));
        return passwordEncoder.matches(rawPassword, organization.getPassword());
    }

    public void deleteOrganization(String email) {
        Organization organization = organizationRepository.findByEmail(email)
                .orElseThrow(() -> new RecordNotFoundGeneralException("No organization found for email: " + email));
        organizationRepository.delete(organization);
    }
}

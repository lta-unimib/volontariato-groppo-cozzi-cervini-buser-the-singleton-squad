package com.unimib.singletonsquad.doit.database.organization;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
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

    public Optional<Organization> findOrganizationById(Long id) {
        return organizationRepository.findById((long) id);
    }

    public Optional<Organization> findOrganizationByEmail(String email) {
        return organizationRepository.findByEmail(email);
    }

    public boolean authenticateOrganization(String email, String rawPassword) {
        Optional<Organization> organizationOptional = organizationRepository.findByEmail(email);
        if (organizationOptional.isPresent()) {
            Organization organization = organizationOptional.get();
            return passwordEncoder.matches(rawPassword, organization.getPassword());
        } else {
            return false;
        }
    }


    public boolean findOrganizationByName(String name) {
        return organizationRepository.findByName(name) != null;
    }
}

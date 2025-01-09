package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.Organization;
import com.unimib.singletonsquad.doit.domain.Volunteer;
import com.unimib.singletonsquad.doit.repository.IOrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional

public class OrganizationService {
    @Autowired
    private IOrganizationRepository organizationRepository;

    public Organization save(Organization organization) {
        return organizationRepository.save(organization);
    }

    public Optional<Organization> findOrganizationById(Long id) {
        return organizationRepository.findById((long) id);
    }

    public Optional<Organization> findOrganizationByEmail(String email) {
        return organizationRepository.findByEmail(email);
    }
    public boolean isRegistered(Long volunteerId) {
        Optional<Organization> organization = organizationRepository.findById(volunteerId);
        return (organization.isPresent()) ? organization.get().isRegistered() : false;
    }
}

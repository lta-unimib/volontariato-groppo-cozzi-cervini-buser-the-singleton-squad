package com.unimib.singletonsquad.doit.service.database;

import com.unimib.singletonsquad.doit.domain.Organization;
import com.unimib.singletonsquad.doit.repository.IOrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class OrganizationService {
    private final IOrganizationRepository organizationRepository;

    @Autowired
    public OrganizationService(IOrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public Organization save(Organization organization) {
        return organizationRepository.save(organization);
    }

    public Optional<Organization> findOrganizationById(int id) {
        return organizationRepository.findById((long) id);
    }

    public Optional<Organization> findOrganizationByEmail(String email) {
        return organizationRepository.findByEmail(email);
    }
}

package com.unimib.singletonsquad.doit.Service.Database;

import com.unimib.singletonsquad.doit.Domain.Organization;
import com.unimib.singletonsquad.doit.Repository.IOrganizationRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrganizationService {
    private final IOrganizationRepository organizationRepository;


    public OrganizationService(IOrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public Organization save(Organization organization) {
        return this.organizationRepository.save(organization);
    }

    public Optional<Organization> findOrganizationByEmail(String email) {
        return this.organizationRepository.findByEmail(email);
    }

}


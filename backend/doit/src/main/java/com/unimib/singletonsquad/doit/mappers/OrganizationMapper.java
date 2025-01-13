package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.OrganizationDTO;
import org.springframework.stereotype.Component;

@Component
public class OrganizationMapper {

    /**
     *  TODO LE PREFERENZE
     *
     *
     */

    public Organization mapToOrganization(OrganizationDTO organizationDTO){
        Organization organization = new Organization();
        organization.setDescription(organizationDTO.getDescription());
        organization.setName(organizationDTO.getName());
        organization.setEmail(organizationDTO.getEmail());
        organization.setCategories(organizationDTO.getPreferenze());
        organization.setWebsite(organizationDTO.getWebSite());
        organization.setPassword(organizationDTO.getPassword());
        organization.setRole(organizationDTO.getRole());
        organization.setVATNumber(organizationDTO.getVatNumber());
        return organization;
    }
}

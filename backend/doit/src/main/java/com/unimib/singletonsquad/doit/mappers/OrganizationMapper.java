package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.OrganizationDTO;
import org.springframework.stereotype.Component;

@Component
public class OrganizationMapper {

    public Organization mapToOrganization(OrganizationDTO organizationDTO){
        Organization organization = new Organization();
        organization.setDescription(organizationDTO.getDescription());
        organization.setName(organizationDTO.getName());
        organization.setEmail(organizationDTO.getEmail());
        organization.setCategories(organizationDTO.getPreferences());
        organization.setWebsite(organizationDTO.getWebSite());
        organization.setPassword(organizationDTO.getPassword());
        organization.setVATNumber(organizationDTO.getVatNumber());
        organization.setCity(organizationDTO.getCity());
        return organization;
    }
}

package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.organization.StatisticOrganization;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.received.OrganizationDTO;
import org.springframework.stereotype.Component;

@Component
public class OrganizationMapper {

    private OrganizationMapper() {}

    /// FROM ORGANIZATION DTO --> ORGANIZATION: create a new entity
    public static Organization mapToOrganization(OrganizationDTO organizationDTO){
        Organization organization = new Organization();
        organization.setDescription(organizationDTO.getDescription());
        organization.setName(organizationDTO.getName());
        organization.setEmail(organizationDTO.getEmail());
        organization.setCategories(organizationDTO.getPreferences());
        organization.setWebsite(organizationDTO.getWebSite());
        organization.setPassword(organizationDTO.getPassword());
        organization.setVATNumber(organizationDTO.getVatNumber());
        organization.setCity(organizationDTO.getCity());
        StatisticOrganization statisticOrganization = StatisticMapper.createStaticOrganization(organization);
        organization.setStatisticOrganization(statisticOrganization);
        return organization;
    }

    /// Update the Organization entity with Organization DTO
    public static Organization updateOrganizationInfos(Organization organization, OrganizationDTO organizationDTO){
        organization.setDescription(organizationDTO.getDescription());
        organization.setName(organizationDTO.getName());
        organization.setWebsite(organizationDTO.getWebSite());
        organization.setVATNumber(organizationDTO.getVatNumber());
        organization.setCity(organizationDTO.getCity());
        organization.setCategories(organizationDTO.getPreferences());

        return organization;
    }

    /// FROM ORGANIZATION ---> ORGANIZATIONDTO
    public static OrganizationDTO mapToOrganizationDTO(Organization organization){
        OrganizationDTO organizationDTO = new OrganizationDTO();
        organizationDTO.setDescription(organization.getDescription());
        organizationDTO.setName(organization.getName());
        organizationDTO.setEmail(organization.getEmail());
        organizationDTO.setCity(organization.getCity());
        organizationDTO.setVatNumber(organization.getVATNumber());
        organizationDTO.setWebSite(organization.getWebsite());
        organizationDTO.setPreferences(organization.getCategories());
        organizationDTO.setRole("Organization");
        return organizationDTO;
    }
}

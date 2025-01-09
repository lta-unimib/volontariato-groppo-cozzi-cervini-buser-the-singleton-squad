package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.Location;
import com.unimib.singletonsquad.doit.domain.Organization;
import com.unimib.singletonsquad.doit.dto.LocationDTO;
import com.unimib.singletonsquad.doit.dto.SignInFormOrganizationDTO;

public class OrganizationMapper {

    public static Organization organizationInfo(SignInFormOrganizationDTO signInFormOrganizationDTO, Organization organization) {
        organization.setDescription(signInFormOrganizationDTO.getDescription());
        organization.setName(signInFormOrganizationDTO.getName());
        organization.setPhoneNumber(null);
        organization.setSocialNetworks(null);
        organization.setVATNumber(signInFormOrganizationDTO.getVATNumber());
        organization.setWeSite(signInFormOrganizationDTO.getWebsite());
        organization.setOrganizationAddress(toLocation(signInFormOrganizationDTO.getAddress()));
        return organization;
    }

    public static Location toLocation(LocationDTO locationDTO) {
        Location address = new Location();
        address.setPostalCode(locationDTO.getPostalCode());
        address.setCountry(locationDTO.getCountry());
        address.setCity(locationDTO.getCity());

        return address;
    }
}

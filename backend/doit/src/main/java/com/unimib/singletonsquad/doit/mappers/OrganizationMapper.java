package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Location;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.LocationDTO;
import com.unimib.singletonsquad.doit.dto.SignInFormOrganizationDTO;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
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
    public Organization mapToOrganization( Map<String, Object> userAttributes) throws Exception {
        Organization organization = new Organization();
        organization.setName(userAttributes.get("given_name") + "'s organization" + userAttributes.get("sub"));
        organization.setPhoneNumber((String) userAttributes.get("phoneNumber"));
        organization.setEmail((String) userAttributes.get("email"));
        return organization;
    }


}

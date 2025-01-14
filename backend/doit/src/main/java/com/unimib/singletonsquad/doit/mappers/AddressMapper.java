package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Address;
import com.unimib.singletonsquad.doit.dto.AddressDTO;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    public Address createAddress(AddressDTO addressDTO){
        Address address = new Address();
        address.setCity(addressDTO.getCity());
        address.setStreetAddress(addressDTO.getStreet());
        address.setPostalCode(addressDTO.getPostalCode());
        address.setHouseNumber(address.getHouseNumber());
        address.setAdditionalInformation(address.getAdditionalInformation());
        return address;
    }
}

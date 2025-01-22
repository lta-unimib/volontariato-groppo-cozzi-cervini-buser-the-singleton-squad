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
        address.setHouseNumber(addressDTO.getNumber());
        address.setAdditionalInformation(addressDTO.getAdditionalInfo());
        return address;
    }

    public static AddressDTO createAddressDTO(Address address){
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setCity(address.getCity());
        addressDTO.setStreet(address.getStreetAddress());
        addressDTO.setPostalCode(address.getPostalCode());
        addressDTO.setNumber(address.getHouseNumber());
        addressDTO.setAdditionalInfo(address.getAdditionalInformation());
        return addressDTO;
    }
}

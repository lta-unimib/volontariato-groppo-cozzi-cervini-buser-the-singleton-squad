package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Address;
import com.unimib.singletonsquad.doit.dto.recived.AddressDTO;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    /// FROM ADDRESSDTO TO ADDRESS
    public Address createAddress(AddressDTO addressDTO){
        Address address = new Address();
        address.setCity(addressDTO.getCity());
        address.setStreetAddress(addressDTO.getStreet());
        address.setPostalCode(addressDTO.getPostalCode());
        address.setHouseNumber(addressDTO.getNumber());
        address.setAdditionalInformation(addressDTO.getAdditionalInfo());
        return address;
    }

    /// FROM ADDRESS TO ADDRESS DTO
    public static AddressDTO createAddressDTO(Address address){
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setCity(address.getCity());
        addressDTO.setStreet(address.getStreetAddress());
        addressDTO.setPostalCode(address.getPostalCode());
        addressDTO.setNumber(address.getHouseNumber());
        addressDTO.setAdditionalInfo(address.getAdditionalInformation());
        return addressDTO;
    }

    public static Address updateAddress(Address address, AddressDTO addressDTO){
        if(addressDTO.getCity() != null && !addressDTO.getCity().isEmpty()){
            address.setCity(addressDTO.getCity());
        }
        if(addressDTO.getStreet() != null && !addressDTO.getStreet().isEmpty()){
            address.setStreetAddress(addressDTO.getStreet());
        }
        if(addressDTO.getPostalCode() != null && !addressDTO.getPostalCode().isEmpty()){
            address.setPostalCode(addressDTO.getPostalCode());
        }
        if(addressDTO.getNumber() != null && !addressDTO.getNumber().isEmpty()){
            address.setHouseNumber(addressDTO.getNumber());
        }
        if(addressDTO.getAdditionalInfo() != null && !addressDTO.getAdditionalInfo().isEmpty()){
            address.setAdditionalInformation(addressDTO.getAdditionalInfo());
        }
        return address;
    }
}

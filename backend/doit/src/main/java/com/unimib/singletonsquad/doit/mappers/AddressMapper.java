package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Address;
import com.unimib.singletonsquad.doit.dto.received.AddressDTO;
import com.unimib.singletonsquad.doit.dto.send.AddressSendDTO;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {

    private AddressMapper() {}

    /// FROM ADDRESSDTO TO ADDRESS
    public static Address createAddress(AddressDTO addressDTO){
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

    public static AddressSendDTO createAddressSendDTO(Address address){
        AddressSendDTO temp = new AddressSendDTO();
        temp.setCity(address.getCity());
        temp.setStreetAddress(address.getStreetAddress());
        temp.setPostalCode(address.getPostalCode());
        temp.setHouseNumber(address.getHouseNumber());
        temp.setAdditionalInformation(address.getAdditionalInformation());
        return temp;
    }


    /// UPDATE AN ADDRESS
    public static Address updateAddress(Address address, AddressDTO addressDTO){
        String city = addressDTO.getCity();
        if(city != null && !city.isEmpty()) {
            address.setCity(city);
        }
        String street = addressDTO.getStreet();
        if(street != null && !street.isEmpty()){
            address.setStreetAddress(street);
        }
        String postalCode = addressDTO.getPostalCode();
        if(postalCode != null && !postalCode.isEmpty()){
            address.setPostalCode(postalCode);
        }
        String houseNumber = addressDTO.getNumber();
        if(houseNumber != null && !houseNumber.isEmpty()){
            address.setHouseNumber(houseNumber);
        }
        String additionalInformation = addressDTO.getAdditionalInfo();
        if(additionalInformation != null && !additionalInformation.isEmpty()){
            address.setAdditionalInformation(additionalInformation);
        }
        return address;
    }
}

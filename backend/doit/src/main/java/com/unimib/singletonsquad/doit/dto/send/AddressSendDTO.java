package com.unimib.singletonsquad.doit.dto.send;

import lombok.*;

@Data
@Getter
@Setter
public class AddressSendDTO {
    private String streetAddress;
    private String city;
    private String postalCode;
    private String houseNumber;
    private String additionalInformation;
}

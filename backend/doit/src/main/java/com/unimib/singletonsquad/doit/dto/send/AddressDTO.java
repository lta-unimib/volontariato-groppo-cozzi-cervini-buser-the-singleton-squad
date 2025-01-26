package com.unimib.singletonsquad.doit.dto.send;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
public class AddressDTO {
    private String streetAddress;
    private String city;
    private String postalCode;
    private String houseNumber;
    private String additionalInformation;
}

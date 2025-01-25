package com.unimib.singletonsquad.doit.dto.received;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class AddressDTO {
    @JsonProperty("street")
    @NotNull
    @NotEmpty
    private String street;
    @JsonProperty("number")
    @NotNull
    @NotEmpty
    private String number;
    @JsonProperty("city")
    @NotNull
    @NotEmpty
    private String city;
    @JsonProperty("postalCode")
    @NotNull
    @NotEmpty
    private String postalCode;
    @JsonProperty("additionalInfo")
    private String additionalInfo;
}

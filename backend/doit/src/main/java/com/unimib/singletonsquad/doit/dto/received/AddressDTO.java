package com.unimib.singletonsquad.doit.dto.received;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank
    private String street;
    @JsonProperty("number")
    @NotNull
    @NotBlank
    private String number;
    @JsonProperty("city")
    @NotNull
    @NotBlank
    private String city;
    @JsonProperty("postalCode")
    @NotNull
    @NotBlank
    private String postalCode;
    @JsonProperty("additionalInfo")
    private String additionalInfo;
}

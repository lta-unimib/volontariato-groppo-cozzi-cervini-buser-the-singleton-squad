package com.unimib.singletonsquad.doit.dto.received;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CityInfoDTO {
    @NotNull
    @NotEmpty
    private String cityName;
    @NotNull
    private double latitude;
    @NotNull
    private double longitude;
}

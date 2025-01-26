package com.unimib.singletonsquad.doit.dto.received;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AvailabilityDTO {
    @JsonProperty("mode")
    @NotNull
    @NotBlank
    private String mode;
    @JsonProperty("timeRange")
    @NotNull
    private List<String> timeRange  ;
}

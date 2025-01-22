package com.unimib.singletonsquad.doit.dto.recived;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AvailabilityDTO {
    @JsonProperty("mode")
    private String mode;
    @JsonProperty("timeRange")
    private List<String> timeRange  ;
}

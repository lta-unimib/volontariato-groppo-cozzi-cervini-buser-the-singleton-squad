package com.unimib.singletonsquad.doit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class VolunteerRequestDTO {
    @JsonProperty("organizationId")
    private String organizationId;
    @JsonProperty("title")
    private String title;
    @JsonProperty("detailed_description")
    private String detailedDescription;
}

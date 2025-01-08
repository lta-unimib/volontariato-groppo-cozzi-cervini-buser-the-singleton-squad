package com.unimib.singletonsquad.doit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class VolunteerOfferDTO {
    @JsonProperty("volunteer_description")
    private String volunteerDescription;
    @JsonProperty("volunteer_id")
    private long volunteerId;
    @JsonProperty("volunteer_request_id")
    private long volunteerRequestId;
    @JsonProperty("organization_id")
    private long organizationId;
}

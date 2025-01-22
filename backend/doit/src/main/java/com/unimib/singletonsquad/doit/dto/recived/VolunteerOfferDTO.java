package com.unimib.singletonsquad.doit.dto.recived;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class VolunteerOfferDTO {
    @JsonProperty("volunteer_id")
    private long volunteerId;
    @JsonProperty("volunteer_request_id")
    private long volunteerRequestId;
}

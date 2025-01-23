package com.unimib.singletonsquad.doit.dto.received;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class VolunteerOfferDTO {
    @JsonProperty("idRequest")
    private long volunteerRequestId;
}

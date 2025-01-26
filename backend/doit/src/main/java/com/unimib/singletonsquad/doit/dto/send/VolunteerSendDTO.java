package com.unimib.singletonsquad.doit.dto.send;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.unimib.singletonsquad.doit.dto.received.AvailabilityDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class VolunteerSendDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String city;
    private String description;
    private AvailabilityDTO availability;
    @JsonProperty("preferences")
    private List<String> categories;

}

package com.unimib.singletonsquad.doit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.unimib.singletonsquad.doit.domain.Availability;
import lombok.*;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;

@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SignInFormVolunteerDTO extends SingInFormDTO {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("availability")
    private Availability availability;
    @JsonProperty("city")
    private String city;
    @JsonProperty("preferences")
    private List<String> preferences;
    @JsonProperty("description")
    private String description;
}

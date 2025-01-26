package com.unimib.singletonsquad.doit.dto.send;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class ShortVolunteerDTO {
    @JsonProperty("email")
    String email;
    @JsonProperty("id")
    long userId;
}

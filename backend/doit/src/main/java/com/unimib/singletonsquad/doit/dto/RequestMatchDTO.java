package com.unimib.singletonsquad.doit.dto;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Getter
public class RequestMatchDTO {
    private VolunteerRequest volunteerRequest;
    private int points;
}

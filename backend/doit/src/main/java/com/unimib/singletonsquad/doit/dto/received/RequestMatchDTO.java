package com.unimib.singletonsquad.doit.dto.received;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
/// used only internal during matching algorithm
@Data
@AllArgsConstructor
@Getter
public class RequestMatchDTO {
    private VolunteerRequest volunteerRequest;
    private int points;
}

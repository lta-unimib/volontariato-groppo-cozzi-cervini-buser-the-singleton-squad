package com.unimib.singletonsquad.doit.dto.availability;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Time;

@Getter
@Setter
@ToString
public class DailyAvailabilityDTO extends AvailabilityDTO {
    private Time startTime;
    private Time endTime;
}

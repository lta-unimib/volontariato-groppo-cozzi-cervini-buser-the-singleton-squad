package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import com.unimib.singletonsquad.doit.domain.common.DailyAvailability;
import com.unimib.singletonsquad.doit.domain.common.MonthlyAvailability;
import com.unimib.singletonsquad.doit.domain.common.WeeklyAvailability;
import com.unimib.singletonsquad.doit.dto.received.AvailabilityDTO;
import org.springframework.stereotype.Component;

@Component
public class AvailabilityMapper {
    public Availability map(AvailabilityDTO availabilityDTO) {
        Availability availability;
        switch (availabilityDTO.getMode()) {
            case "daily": {
                availability = new DailyAvailability();
                break;
            }
            case "weekly": {
                availability = new WeeklyAvailability();
                break;
            }
            case "monthly": {
                availability = new MonthlyAvailability();
                break;
            }
            default: {
                availability = new DailyAvailability();
            }
        }
        availability.setData(availabilityDTO.getTimeRange());
        return availability;
    }

    public static AvailabilityDTO toAvailabilityDTO(Availability availability) {
        AvailabilityDTO availabilityDTO = new AvailabilityDTO();
        availabilityDTO.setMode(availability.getMode());
        availabilityDTO.setTimeRange(availability.getDataAsList());
        return availabilityDTO;
    }
}

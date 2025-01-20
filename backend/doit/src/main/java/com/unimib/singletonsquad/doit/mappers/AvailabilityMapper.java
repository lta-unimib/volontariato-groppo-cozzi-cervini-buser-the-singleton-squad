package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import com.unimib.singletonsquad.doit.dto.AvailabilityDTO;
import org.springframework.stereotype.Component;

@Component
public class AvailabilityMapper {
    public Availability map(AvailabilityDTO availabilityDTO) {
        Availability availability = new Availability();
        availability.setMode(availabilityDTO.getMode());
        availability.setData(availabilityDTO.getTimeRange());
        return availability;
    }
}

package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import com.unimib.singletonsquad.doit.dto.AvailabilityDTO;

public class AvailabilityMapper {
    public static Availability map(AvailabilityDTO availabilityDTO) {
        Availability availability = new Availability();
        availability.setMode(availabilityDTO.getMode());
        availability.setData(availabilityDTO.getData());
        return availability;
    }
}

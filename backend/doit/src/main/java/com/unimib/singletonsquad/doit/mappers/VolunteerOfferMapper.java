package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.dto.received.VolunteerOfferDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class VolunteerOfferMapper {

    public static List<VolunteerOfferDTO> getListVolunteerOfferDTO(List<VolunteerOffer> volunteerOfferList) {
        List<VolunteerOfferDTO> volunteerOfferDTOS = new ArrayList<>();
        for (VolunteerOffer v : volunteerOfferList) {
            volunteerOfferDTOS.add(OfferMapper.toOfferDTO(v));
        }
        return volunteerOfferDTOS;
    }
}

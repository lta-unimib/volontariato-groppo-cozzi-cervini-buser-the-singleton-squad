package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.send.AddressSendDTO;
import com.unimib.singletonsquad.doit.dto.send.VolunteerSendDTO;
import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestDTO;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class VolunteerRequestDTOMapper {

    private VolunteerRequestDTOMapper() {}


    public static VolunteerRequestDTO mapVolunteerRequestDTO(@NotNull VolunteerRequest volunteerRequest,
                                                             @NotNull List<VolunteerSendDTO> volunteerDTOList){
        VolunteerRequestDTO temp = new VolunteerRequestDTO();
        temp.setId(volunteerRequest.getId());
        temp.setTitle(volunteerRequest.getTitle());
        temp.setCapacity(volunteerRequest.getCapacity());
        temp.setDetailedDescription(volunteerRequest.getDetailedDescription());
        AddressSendDTO tempAddressSendDTO = createAddressSendDTO(volunteerRequest);
        temp.setAddress(tempAddressSendDTO);
        temp.setVolunteers(volunteerDTOList);
        return temp;
    }

    private static AddressSendDTO createAddressSendDTO(@NotNull VolunteerRequest volunteerRequest){
        return AddressMapper.createAddressSendDTO(volunteerRequest.getAddress());

    }

}


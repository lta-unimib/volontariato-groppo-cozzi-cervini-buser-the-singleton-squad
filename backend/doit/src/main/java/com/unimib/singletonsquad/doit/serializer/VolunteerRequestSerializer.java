package com.unimib.singletonsquad.doit.serializer;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.send.VolunteerSendDTO;
import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.mappers.VolunteerDTOMapper;
import com.unimib.singletonsquad.doit.mappers.VolunteerRequestDTOMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class VolunteerRequestSerializer {

    private VolunteerRequestSerializer() {}

    public static List<VolunteerRequestDTO> serializeVolunteerRequests(Map<VolunteerRequest, List<Volunteer>> requestMap) {
        List<VolunteerRequestDTO> data = new ArrayList<>();
        for (Map.Entry<VolunteerRequest, List<Volunteer>> entry : requestMap.entrySet()) {
            VolunteerRequest volunteerRequest = entry.getKey();
            List<VolunteerSendDTO> volunteerDTOs = new ArrayList<>();
            for (Volunteer volunteer : entry.getValue()) {
                volunteerDTOs.add(VolunteerDTOMapper.mapToVolunteerDTO(volunteer));
            }
            VolunteerRequestDTO temp = VolunteerRequestDTOMapper.mapVolunteerRequestDTO(volunteerRequest, volunteerDTOs);
            data.add(temp);
        }
        return data;
    }

}

package com.unimib.singletonsquad.doit.serializer;
import com.unimib.singletonsquad.doit.domain.volunteer.Volunteer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.send.VolunteerDTO;
import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.dto.send.AddressDTO;
import com.unimib.singletonsquad.doit.domain.common.Address;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class VolunteerRequestSerializer {

    private VolunteerRequestSerializer() {}

    public static List<VolunteerRequestDTO> serializeVolunteerRequests(Map<VolunteerRequest, List<Volunteer>> requestMap) {
        List<VolunteerRequestDTO> data = new ArrayList<>();
        for (Map.Entry<VolunteerRequest, List<Volunteer>> entry : requestMap.entrySet()) {
            VolunteerRequest volunteerRequest = entry.getKey();
            List<VolunteerDTO> volunteerDTOs = new ArrayList<>();
            for (Volunteer volunteer : entry.getValue()) {
                volunteerDTOs.add(new VolunteerDTO(volunteer.getName(), volunteer.getSurname(), volunteer.getEmail(), volunteer.getDescription()));
            }
            data.add(new VolunteerRequestDTO(volunteerRequest.getId(), volunteerRequest.getTitle(), volunteerRequest.getDetailedDescription(), volunteerRequest.getCapacity(), createAddress(volunteerRequest.getAddress()), volunteerDTOs));
        }
        return data;
    }

    private static AddressDTO createAddress(Address address) {
        return new AddressDTO(address.getStreetAddress(), address.getCity(), address.getPostalCode(), address.getHouseNumber(), address.getAdditionalInformation());
    }
}

package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Address;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.received.AddressDTO;
import com.unimib.singletonsquad.doit.dto.received.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestSendDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

@Component
@AllArgsConstructor
public class VolunteerRequestMapper {

    private final AddressMapper addressMapper;

    /**
     * FIXME PER IL REFATCOTING PASSARE DIRETTAMENTE LE ORGANIZAZZIONI E NON LE EMAIL !!!!
     */

    /// CREATE A NEW VOLUNTEER REQUEST ONLY FROM /request/new/
    public VolunteerRequest createVolunteerRequest(VolunteerRequestDTO volunteerRequestDTO, Organization organization) throws Exception {
        VolunteerRequest volunteerRequest = new VolunteerRequest();
        volunteerRequest.setOrganization(organization);
        volunteerRequest.setAddress(this.createNewAddress(volunteerRequestDTO.getAddress()));
        //volunteerRequest.setFeedbacks(new ArrayList<>());
        volunteerRequest.setFeedbackMap(new HashMap<>());
        volunteerRequest.setVolunteerOffers(new ArrayList<>());
        return mapCommonFiled(volunteerRequest, volunteerRequestDTO);
    }


    /// UPDATE A VOLUNTEER REQUEST ONLY FROM PUT /request/{id}/
    public VolunteerRequest updateVolunteerRequest(VolunteerRequest toBeUpdated, VolunteerRequestDTO volunteerRequestDTO, Organization organization) throws Exception {
        toBeUpdated.setVolunteerOffers(toBeUpdated.getVolunteerOffers());
        //toBeUpdated.setFeedbacks(toBeUpdated.getFeedbacks());
        //toBeUpdated.getFeedbackMap().forEach((key, value) -> toBeUpdated.getFeedbackMap().put(key, value));
        //toBeUpdated.setFeedbackMap(toBeUpdated.getFeedbackMap());
        toBeUpdated.setId(toBeUpdated.getId());
        toBeUpdated.setAddress(updateAddress(toBeUpdated.getAddress(), volunteerRequestDTO.getAddress()));
        return mapCommonFiled(toBeUpdated, volunteerRequestDTO);
    }


    private static VolunteerRequest mapCommonFiled(VolunteerRequest volunteerRequest, VolunteerRequestDTO volunteerRequestDTO) throws Exception {
        volunteerRequest.setCapacity(volunteerRequestDTO.getVolunteerCapacity());
        volunteerRequest.setDetailedDescription(volunteerRequestDTO.getDescription());
        volunteerRequest.setTitle(volunteerRequestDTO.getTitle());
        volunteerRequest.setVolunteerCategories(volunteerRequestDTO.getCategories());
        LocalDateTime[] hours = setTimeRangeAndStartTime(volunteerRequestDTO.getTimeRange(),
                volunteerRequestDTO.getStartTime(), volunteerRequestDTO.getEndTime());
        volunteerRequest.setStartDateTime(hours[0]);
        volunteerRequest.setEndDateTime(hours[1]);
        return volunteerRequest;
    }


    private Address createNewAddress(AddressDTO addressDTO) {
        return this.addressMapper.createAddress(addressDTO);
    }

    private Address updateAddress(Address address, AddressDTO addressDTO) {
        return this.addressMapper.updateAddress(address, addressDTO);
    }

    public static VolunteerRequestSendDTO mapToVolunteerRequestDTO(VolunteerRequest volunteerRequest) {
        VolunteerRequestSendDTO requestDTO = new VolunteerRequestSendDTO();
        requestDTO.setId(volunteerRequest.getId());
        requestDTO.setTitle(volunteerRequest.getTitle());
        requestDTO.setVolunteerCapacity(volunteerRequest.getCapacity());
        requestDTO.setDescription(volunteerRequest.getDetailedDescription());

        requestDTO.setCategories(volunteerRequest.getVolunteerCategories());
        requestDTO.setAddress(AddressMapper.createAddressDTO(volunteerRequest.getAddress()));
        String[] start = extractDateTime(volunteerRequest.getStartDateTime());
        String[] end = extractDateTime(volunteerRequest.getEndDateTime());
        requestDTO.setStartTime(start[1]);
        requestDTO.setEndTime(end[1]);
        requestDTO.setTimeRange(List.of(start[0], end[0]));
        requestDTO.setOrganization(volunteerRequest.getOrganization());
        return requestDTO;
    }

    /// === SUPPORT METHOD ===
    private static LocalDateTime combineDateTime(String date, String time) {
        LocalDate localDate = LocalDate.parse(date);
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH);
        LocalTime localTime = LocalTime.parse(time, timeFormatter);
        return LocalDateTime.of(localDate, localTime);
    }

    private static LocalDateTime[] setTimeRangeAndStartTime(List<String> timeRange, String startTime, String endTime)
            throws Exception {
        if (timeRange != null && timeRange.size() == 2
                && startTime != null && !startTime.isEmpty()
                && endTime != null && !endTime.isEmpty()) {
            return new LocalDateTime[]{
                    combineDateTime(timeRange.get(0), startTime),
                    combineDateTime(timeRange.get(1), endTime)};
        }
        throw new IllegalArgumentException("Time range or start time list is null or empty");
    }

    private static String[] extractDateTime(LocalDateTime dateTime) {
        String date = dateTime.toLocalDate().toString(); // Formato "yyyy-MM-dd"
        String time = dateTime.toLocalTime().format(DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH));
        return new String[]{date, time};
    }

    /// FIXME INSERIRLO IN UN MAPPER DTO APPOSITO
    public static List<VolunteerRequestSendDTO> getRequestSendDTOList(final List<VolunteerRequest> volunteerRequest) {
        List<VolunteerRequestSendDTO> volunteerRequestDTOS = new ArrayList<>();
        for (VolunteerRequest volunteersingle : volunteerRequest) {
            volunteerRequestDTOS.add(mapToVolunteerRequestDTO(volunteersingle));
        }
        return volunteerRequestDTOS;
    }

}

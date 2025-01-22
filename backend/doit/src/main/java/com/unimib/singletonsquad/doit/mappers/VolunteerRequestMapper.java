package com.unimib.singletonsquad.doit.mappers;
import com.unimib.singletonsquad.doit.domain.common.Address;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Component
@AllArgsConstructor
public class VolunteerRequestMapper {

    private final AddressMapper addressMapper;
    private final OrganizationDatabaseService organizationService;


    /**
     * FIXME PER IL REFATCOTING PASSARE DIRETTAMENTE LE ORGANIZAZZIONI E NON LE EMAIL !!!!
     */

    public VolunteerRequest updateVolunteerRequest(VolunteerRequestDTO requestDTO, Long requestId, String organizationEmail)
            throws Exception {
        VolunteerRequest volunteerRequest = new VolunteerRequest();
        volunteerRequest.setId(requestId);
        return mapVolunteerRequestFields(requestDTO, volunteerRequest, organizationEmail);
    }

    public VolunteerRequest createRequestVolunteer(VolunteerRequestDTO requestDTO, String organizationEmail)
            throws Exception {
        VolunteerRequest volunteerRequest = new VolunteerRequest();
        return mapVolunteerRequestFields(requestDTO, volunteerRequest, organizationEmail);
    }

    private VolunteerRequest mapVolunteerRequestFields(VolunteerRequestDTO requestDTO,
                                                       VolunteerRequest volunteerRequest,
                                                       String organizationEmail) throws Exception {
        Address address = this.addressMapper.createAddress(requestDTO.getAddress());
        volunteerRequest.setTitle(requestDTO.getTitle());
        volunteerRequest.setAddress(address);
        volunteerRequest.setVolunteerCategories(requestDTO.getCategories());
        volunteerRequest.setCapacity(requestDTO.getVolunteerCapacity());
        volunteerRequest.setDetailedDescription(requestDTO.getDescription());
        volunteerRequest.setOrganization(getOrganizationByEmail(organizationEmail));
        volunteerRequest.setVolunteerOffers(new ArrayList<>());
        LocalDateTime[] hours = setTimeRangeAndStartTime(requestDTO.getTimeRange(),
                requestDTO.getStartTime(), requestDTO.getEndTime());
        volunteerRequest.setStartDateTime(hours[0]);
        volunteerRequest.setEndDateTime(hours[1]);
        volunteerRequest.setFrequency(requestDTO.getFrequency());

        return volunteerRequest;
    }

    public static VolunteerRequestDTO mapToVolunteerRequestDTO(VolunteerRequest volunteerRequest) {
        VolunteerRequestDTO volunteerRequestDTO = new VolunteerRequestDTO();
        volunteerRequestDTO.setTitle(volunteerRequest.getTitle());
        volunteerRequestDTO.setVolunteerCapacity(volunteerRequest.getCapacity());
        volunteerRequestDTO.setDescription(volunteerRequest.getDetailedDescription());
        volunteerRequestDTO.setCategories(volunteerRequest.getVolunteerCategories());
        volunteerRequestDTO.setFrequency(volunteerRequest.getFrequency());
        volunteerRequestDTO.setAddress(AddressMapper.createAddressDTO(volunteerRequest.getAddress()));
        String[] start = extractDateTime(volunteerRequest.getStartDateTime());
        String[] end = extractDateTime(volunteerRequest.getEndDateTime());
        volunteerRequestDTO.setStartTime(start[1]);
        volunteerRequestDTO.setEndTime(end[1]);
        volunteerRequestDTO.setTimeRange(List.of(start[0], end[0]));
        volunteerRequestDTO.setOrganization(OrganizationMapper.mapToOrganizationDTO(volunteerRequest.getOrganization()));
        return volunteerRequestDTO;
    }


    private Organization getOrganizationByEmail(String email) throws Exception {
        return organizationService.findOrganizationByEmail(email)
                .orElseThrow(() -> new Exception("Organization not found with email: " + email));
    }


    /// === SUPPORT METHOD ===
    private static LocalDateTime combineDateTime(String date, String time) {
        LocalDate localDate = LocalDate.parse(date);
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH);
        LocalTime localTime = LocalTime.parse(time, timeFormatter);
        return LocalDateTime.of(localDate, localTime);
    }

    private LocalDateTime[] setTimeRangeAndStartTime(List<String> timeRange, String startTime, String endTime)
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
}
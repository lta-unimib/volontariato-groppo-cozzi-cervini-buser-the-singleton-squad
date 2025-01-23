package com.unimib.singletonsquad.doit.mappers;

import com.unimib.singletonsquad.doit.domain.common.Address;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerOffer;
import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.dto.recived.AddressDTO;
import com.unimib.singletonsquad.doit.dto.recived.VolunteerRequestDTO;
import com.unimib.singletonsquad.doit.database.organization.OrganizationDatabaseService;
import com.unimib.singletonsquad.doit.dto.send.VolunteerRequestSendDTO;
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

    /**
     * FIXME PER IL REFATCOTING PASSARE DIRETTAMENTE LE ORGANIZAZZIONI E NON LE EMAIL !!!!
     */

    public VolunteerRequest createVolunteerRequest(VolunteerRequestDTO volunteerRequestDTO, Organization organization) throws Exception {
        VolunteerRequest volunteerRequest = new VolunteerRequest();
        volunteerRequest.setOrganization(organization);
        volunteerRequest.setAddress(this.createNewAddress(volunteerRequestDTO.getAddress()));
        volunteerRequest.setFeedbackVolunteerRequests(new ArrayList<>());
        volunteerRequest.setVolunteerOffers(new ArrayList<>());
        return mapCommonFiled(volunteerRequest, volunteerRequestDTO);
    }


    private VolunteerRequest mapCommonFiled(VolunteerRequest volunteerRequest, VolunteerRequestDTO volunteerRequestDTO) throws Exception {
        volunteerRequest.setCapacity(volunteerRequestDTO.getVolunteerCapacity());
        volunteerRequest.setDetailedDescription(volunteerRequest.getDetailedDescription());
        volunteerRequest.setTitle(volunteerRequest.getTitle());
        volunteerRequest.setVolunteerCategories(volunteerRequest.getVolunteerCategories());
        LocalDateTime[] hours = setTimeRangeAndStartTime(volunteerRequestDTO.getTimeRange(),
                volunteerRequestDTO.getStartTime(), volunteerRequestDTO.getEndTime());
        volunteerRequest.setStartDateTime(hours[0]);
        volunteerRequest.setEndDateTime(hours[1]);
        return volunteerRequest;
    }


    private Address createNewAddress(AddressDTO addressDTO) {
        return this.addressMapper.createAddress(addressDTO);
    }


    /// COSE CHE CAMBIANO DI UNA RICHIESTA

/*
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
        Address address = null;

        if (requestDTO.getAddress() != null) {
            // Verifica che i campi obbligatori siano presenti
            if (requestDTO.getAddress().getCity() == null || requestDTO.getAddress().getCity().isEmpty()) {
                throw new IllegalArgumentException("City is required for Address");
            }
            if (requestDTO.getAddress().getStreet() == null || requestDTO.getAddress().getStreet().isEmpty()) {
                throw new IllegalArgumentException("Street Address is required for Address");
            }
            if (requestDTO.getAddress().getPostalCode() == null || requestDTO.getAddress().getPostalCode().isEmpty()) {
                throw new IllegalArgumentException("Postal Code is required for Address");
            }
            if (requestDTO.getAddress().getNumber() == null || requestDTO.getAddress().getNumber().isEmpty()) {
                throw new IllegalArgumentException("House Number is required for Address");
            }

            // Creazione dell'oggetto Address
            address = this.addressMapper.createAddress(requestDTO.getAddress());
        }

        volunteerRequest.setAddress(address);
        volunteerRequest.setTitle(requestDTO.getTitle());
        volunteerRequest.setVolunteerCategories(requestDTO.getCategories());
        volunteerRequest.setCapacity(requestDTO.getVolunteerCapacity());
        volunteerRequest.setDetailedDescription(requestDTO.getDescription());
        volunteerRequest.setOrganization(this.organizationService.findOrganizationByEmail(organizationEmail));
        volunteerRequest.setVolunteerOffers(new ArrayList<>());

        LocalDateTime[] hours = setTimeRangeAndStartTime(requestDTO.getTimeRange(),
                requestDTO.getStartTime(), requestDTO.getEndTime());
        volunteerRequest.setStartDateTime(hours[0]);
        volunteerRequest.setEndDateTime(hours[1]);
        volunteerRequest.setFeedbackVolunteerRequests(new ArrayList<>());

        return volunteerRequest;
    }


*/

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

package com.unimib.singletonsquad.doit.dto.send;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.unimib.singletonsquad.doit.domain.common.CityInfo;
import com.unimib.singletonsquad.doit.domain.organization.Organization;
import com.unimib.singletonsquad.doit.dto.received.AddressDTO;
import com.unimib.singletonsquad.doit.serializer.OrganizationNameSerializer;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class VolunteerRequestSendDTO {

    private Long id;
    private String title;
    private List<String> timeRange;
    private AddressDTO address;
    private List<String> categories;
    private List<String> frequency;
    private String description;
    private String startTime;
    private String endTime;
    private int volunteerCapacity;
    private CityInfo cityInfo;
    @JsonSerialize(using = OrganizationNameSerializer.class)
    private Organization organization;

}

package com.unimib.singletonsquad.doit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class VolunteerRequestDTO {
    @JsonProperty("title")
    private String title;
    @JsonProperty("description")
    private String detailedDescription;
    @JsonProperty("address")
    private AddressDTO address;
    @JsonProperty("startTime")
    private String startDate;
    @JsonProperty("endTime")
    String endDate;
    @JsonProperty("volunteerCapacity")
    private int volunteerCapacity;
    @JsonProperty("categories")
    private List<String> categories;
    @JsonProperty("frequency")
    private List<String> volunteerType;
}

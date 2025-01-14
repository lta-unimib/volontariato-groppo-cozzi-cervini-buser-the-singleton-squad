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
    @JsonProperty("organizationId")
    private String organizationId;
    @JsonProperty("title")
    private String title;
    @JsonProperty("description")
    private String detailedDescription;
    @JsonProperty("date")
    private String date;
    @JsonProperty("Address")
    private AddressDTO address;
    @JsonProperty("date")
    private String startDate;
    @JsonProperty("endDate")
    String endDate;
    @JsonProperty("volunteerCapacity")
    private int volunteerCapacity;
    @JsonProperty("categories")
    private List<String> categories;
}

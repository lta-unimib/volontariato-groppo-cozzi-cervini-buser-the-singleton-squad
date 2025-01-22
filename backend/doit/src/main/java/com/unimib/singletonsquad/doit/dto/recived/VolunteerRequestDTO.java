package com.unimib.singletonsquad.doit.dto.recived;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerRequestDTO {
    @NotNull
    private String title;

    @NotNull
    private List<String> timeRange;

    @NotNull
    private AddressDTO address;

    @NotNull
    private List<String> categories;

    @NotNull
    private List<String> frequency;

    @NotNull
    private String description;

    @NotNull
    private Integer volunteerCapacity;

    @NotNull
    private String startTime;

    @NotNull
    private String endTime;

}

package com.unimib.singletonsquad.doit.dto.received;


import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
    private String description;

    @NotNull
    private Integer volunteerCapacity;

    @NotNull
    private String startTime;

    @NotNull
    private String endTime;


}

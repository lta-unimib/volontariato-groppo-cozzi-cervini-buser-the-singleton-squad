package com.unimib.singletonsquad.doit.dto.received;


import jakarta.validation.constraints.NotEmpty;
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
    @NotEmpty
    private String title;

    @NotNull
    @NotEmpty
    private List<String> timeRange;

    @NotNull
    @NotEmpty
    private AddressDTO address;

    @NotNull
    private List<String> categories;

    @NotNull
    @NotEmpty
    private String description;

    @NotNull
    private Integer volunteerCapacity;

    @NotNull
    @NotEmpty
    private String startTime;

    @NotNull
    @NotEmpty
    private String endTime;


}

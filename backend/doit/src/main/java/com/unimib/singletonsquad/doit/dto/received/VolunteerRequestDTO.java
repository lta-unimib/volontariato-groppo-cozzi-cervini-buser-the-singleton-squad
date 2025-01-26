package com.unimib.singletonsquad.doit.dto.received;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank
    private String title;

    @NotNull
    private List<String> timeRange;

    @NotNull
    @NotBlank
    private AddressDTO address;

    @NotNull
    private List<String> categories;

    @NotNull
    @NotBlank
    private String description;

    @NotNull
    @Min(value = 1, message = "capacity must be greater or equal than 1")
    private Integer volunteerCapacity;

    @NotNull
    @NotBlank
    private String startTime;

    @NotNull
    @NotBlank
    private String endTime;


}

package com.unimib.singletonsquad.doit.dto.send;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class VolunteerRequestDTO {
    private Long id;
    private String title;
    private String detailedDescription;
    private Integer capacity;
    private AddressSendDTO address;
    private List<VolunteerSendDTO> volunteers;
}

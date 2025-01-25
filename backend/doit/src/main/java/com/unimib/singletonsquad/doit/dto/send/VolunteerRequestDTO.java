package com.unimib.singletonsquad.doit.dto.send;

import com.unimib.singletonsquad.doit.dto.send.AddressDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class VolunteerRequestDTO {
    private Long id;
    private String title;
    private String detailedDescription;
    private Integer capacity;
    private AddressDTO address;
    private List<VolunteerDTO> volunteers;


}

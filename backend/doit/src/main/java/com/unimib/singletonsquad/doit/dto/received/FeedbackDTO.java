package com.unimib.singletonsquad.doit.dto.received;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FeedbackDTO {
    @NotNull
    double vote;
}

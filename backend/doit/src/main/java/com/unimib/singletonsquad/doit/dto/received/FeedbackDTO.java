package com.unimib.singletonsquad.doit.dto.received;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
@Data
@Getter
@AllArgsConstructor
public class FeedbackDTO {
    @NotNull
    @Min(value = 1, message = "Vote must be between 1 and 5")
    @Max(value = 5, message = "Vote must be between 1 and 5")
    Double   vote;
    @Email
    @Nullable
    String email;

}

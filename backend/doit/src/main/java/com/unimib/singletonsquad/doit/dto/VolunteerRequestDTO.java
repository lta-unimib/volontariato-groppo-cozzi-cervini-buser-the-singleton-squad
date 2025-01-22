package com.unimib.singletonsquad.doit.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

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


    // TODO AGGIUNTA METODI PER FARE IL PARSING
    public static LocalDateTime combineDateTime(String date, String time) {
        // Parse della data
        LocalDate localDate = LocalDate.parse(date);

        // Parse del tempo --> obblifatorio english perchè usiamo AM e PM
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH);
        LocalTime localTime = LocalTime.parse(time, timeFormatter);

        // Combina data e tempo
        return LocalDateTime.of(localDate, localTime);
    }
    public void setTimeRangeAndStartTime(List<String> timeRange, String startTime, String endTime) {
        if (timeRange != null && !timeRange.isEmpty()
                && startTime != null && !startTime.isEmpty()
                && endTime != null  && !endTime.isEmpty()) {
            this.startDate = combineDateTime(timeRange.get(0), startTime);
            this.endDate = combineDateTime(timeRange.get(1), endTime);
        }
    }
    // Metodo per estrarre data e ora da LocalDateTime nei formati richiesti
    public static String[] extractDateTime(LocalDateTime dateTime) {
        String date = dateTime.toLocalDate().toString(); // Formato "yyyy-MM-dd"
        String time = dateTime.toLocalTime().format(DateTimeFormatter.ofPattern("hh:mm a", Locale.ENGLISH));
        return new String[]{date, time};
    }
}

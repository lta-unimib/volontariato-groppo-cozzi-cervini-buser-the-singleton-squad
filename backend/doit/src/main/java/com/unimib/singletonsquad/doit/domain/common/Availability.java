package com.unimib.singletonsquad.doit.domain.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.unimib.singletonsquad.doit.converter.ListObjectConverter;
import com.unimib.singletonsquad.doit.utils.data.DataConverter;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "availability")
public class Availability{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @JsonProperty("mode")
    private String mode;
    @JsonProperty("timeRange")
    @Convert(converter = ListObjectConverter.class)
    @Lob
    @Column(name = "data", columnDefinition = "TEXT")
    private List<String> data;

    public boolean matching(LocalDateTime startDateTime, LocalDateTime endDateTime) {

        switch (mode) {
            case "daily": {
                LocalTime startTime = startDateTime.toLocalTime();
                LocalTime endTime = endDateTime.toLocalTime();
                if(data.get(0) != null && data.get(1) != null) {
                    LocalTime availableTimeStart = LocalTime.parse(data.get(0));
                    LocalTime availableTimeEnd = LocalTime.parse(data.get(1));
                    if(startTime != null && endTime != null) {
                        return availableTimeStart.isAfter(startTime) && availableTimeEnd.isBefore(endTime);
                    }
                }
                return false;
            }
            case "weekly": {
                LocalDateTime localDateTime = startDateTime;

                while(localDateTime.isBefore(endDateTime)) {
                    localDateTime = localDateTime.plusDays(1);
                    String day = localDateTime.getDayOfWeek().toString();
                    day = DataConverter.translateDayOfWeek(day);
                    if(data.contains(day)) {
                        return true;
                    }
                }
                break;
            }
            case "monthly": {
                LocalDateTime availableTimeStart = LocalDateTime.parse(data.get(0).replace("Z", ""));
                LocalDateTime availableTimeEnd = LocalDateTime.parse(data.get(1).replace("Z", ""));
                return availableTimeStart.isBefore(startDateTime) && availableTimeEnd.isAfter(endDateTime);
            }
            default:
                throw new IllegalArgumentException("Unsupported mode " + mode);
        }
         
        return false;
    }

    public boolean isBetween(LocalDateTime start, LocalDateTime end) {
        LocalDateTime availabilityData = LocalDateTime.now();
        return availabilityData.isAfter(start) && availabilityData.isBefore(end);
    }
}

package com.unimib.singletonsquad.doit.domain.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.unimib.singletonsquad.doit.converter.ListObjectConverter;
import com.unimib.singletonsquad.doit.utils.data.DataConverter;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
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
    private Long id;

    @JsonProperty("mode")
    private String mode;
    @JsonProperty("data")
    @Convert(converter = ListObjectConverter.class)
    @Lob
    @Column(name = "data", columnDefinition = "TEXT")
    private List<String> data;

    public boolean matching(String start, String end) {
        LocalDateTime startDateTime = LocalDateTime.parse(start);
        LocalDateTime endDateTime = LocalDateTime.parse(end);

        switch (mode) {
            case "daily": {
                System.out.println("Checking for daily Availability");
                LocalTime startTime = startDateTime.toLocalTime();
                LocalTime endTime = endDateTime.toLocalTime();
                LocalTime availableTimeStart = LocalTime.parse(data.get(0));
                LocalTime availableTimeEnd = LocalTime.parse(data.get(1));

                return availableTimeStart.isAfter(startTime) && availableTimeEnd.isBefore(endTime);
            }
            case "weekly": {
                System.out.println("Weekly Availability");
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
                System.out.println("Checking for monthly Availability");
                LocalDateTime availableTimeStart = LocalDateTime.parse(data.get(0).replaceAll("Z", ""));
                LocalDateTime availableTimeEnd = LocalDateTime.parse(data.get(1).replaceAll("Z", ""));
                return availableTimeStart.isBefore(startDateTime) && availableTimeEnd.isAfter(endDateTime);
            }
        }
         
        return false;
    }

    public boolean isBetween(LocalDateTime start, LocalDateTime end) {
        LocalDateTime availabilityData = LocalDateTime.now();//TODO CHANGE
        return availabilityData.isAfter(start) && availabilityData.isBefore(end);
    }
}

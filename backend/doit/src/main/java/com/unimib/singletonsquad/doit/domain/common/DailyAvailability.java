package com.unimib.singletonsquad.doit.domain.common;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@DiscriminatorValue("daily")
public class DailyAvailability extends Availability {
    private LocalTime startTime;
    private LocalTime endTime;

    @Override
    public void setData(List<String> data) {
        if (data != null && data.size() == 2) {
            this.startTime = LocalTime.parse(data.get(0));
            this.endTime = LocalTime.parse(data.get(1));
        }
    }

    @Override
    public boolean matching(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        LocalTime start = startDateTime.toLocalTime();
        LocalTime end = endDateTime.toLocalTime();
        return !start.isBefore(startTime) && !end.isAfter(endTime);
    }

    @Override
    public String getMode() {
        return "daily";
    }

    @ElementCollection
    public List<String> getDataAsList() {
        return List.of(startTime.toString(), endTime.toString());
    }
}


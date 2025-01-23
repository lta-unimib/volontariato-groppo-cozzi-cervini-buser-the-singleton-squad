package com.unimib.singletonsquad.doit.domain.common;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Entity
public class MonthlyAvailability extends Availability {
    @Column
    private LocalDateTime startDate;
    @Column
    private LocalDateTime endDate;

    public void setData(List<String> data) {
        startDate = LocalDateTime.parse(data.get(0).replace("Z", ""));
        endDate = LocalDateTime.parse(data.get(1).replace("Z", ""));
    }

    @Override
    public boolean matching(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        return this.startDate.isBefore(startDateTime) && this.endDate.isAfter(endDateTime);
    }

    @Override
    public String getMode() {
        return "monthly";
    }

    @Override
    @ElementCollection
    public List<String> getDataAsList() {
        return List.of(startDate.toString(), endDate.toString());
    }
}

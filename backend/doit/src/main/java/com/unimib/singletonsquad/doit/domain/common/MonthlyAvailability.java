package com.unimib.singletonsquad.doit.domain.common;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Entity
public class MonthlyAvailability extends Availability {
    @Column
    private LocalDate startDate;
    @Column
    private LocalDate endDate;

    public void setData(List<String> data) {
        startDate = LocalDate.parse(data.get(0).replace("Z", ""));
        endDate = LocalDate.parse(data.get(1).replace("Z", ""));
    }

    @Override
    public boolean matching(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        return this.startDate.atStartOfDay().isBefore(startDateTime) && this.endDate.plusDays(1).atStartOfDay().isAfter(endDateTime);
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

package com.unimib.singletonsquad.doit.domain.common;

import com.unimib.singletonsquad.doit.converter.ListObjectConverter;
import com.unimib.singletonsquad.doit.utils.data.DataConverter;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@DiscriminatorValue("weekly")
public class WeeklyAvailability extends Availability {
    @Convert(converter = ListObjectConverter.class)
    @Lob
    @Column(name = "days", columnDefinition = "TEXT")
    private List<String> days;

    @Override
    public void setData(List<String> data) {
        this.days = data;
    }

    @Override
    public boolean matching(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        LocalDateTime localDateTime = startDateTime;
        int stop = 0;
        while(localDateTime.isBefore(endDateTime) && stop <= 7) {
            localDateTime = localDateTime.plusDays(1);
            String day = localDateTime.getDayOfWeek().toString();
            day = DataConverter.translateDayOfWeek(day);
            if(days.contains(day)) {
                return true;
            }
            stop++;
        }
        return false;
    }

    @Override
    public String getMode() {
        return "weekly";
    }

    @Override
    @ElementCollection
    public List<String> getDataAsList() {
        return days;
    }
}


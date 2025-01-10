package com.unimib.singletonsquad.doit.domain.volunteer;

import com.unimib.singletonsquad.doit.domain.common.Availability;
import com.unimib.singletonsquad.doit.domain.common.VolunteerCategories;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "volunteer_preferences")
public class VolunteerPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String city;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<VolunteerCategories> volunteerCategories;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "availability_id") // La colonna di join che riferisce la tabella availability
    private Availability availability;

    public void addNewVolunteerCategories(VolunteerCategories volunteerCategories) {
        this.volunteerCategories.add(volunteerCategories);
    }

    @Override
    public String toString() {
        return "VolunteerPreferences{" +
                "city='" + city + '\'' +
                ", volunteerCategories=" + volunteerCategories +
                '}';
    }
}

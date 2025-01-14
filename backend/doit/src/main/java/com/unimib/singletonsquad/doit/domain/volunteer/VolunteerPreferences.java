package com.unimib.singletonsquad.doit.domain.volunteer;

import com.unimib.singletonsquad.doit.domain.common.Availability;
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
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String city;
    @ElementCollection
    private List<String> categories;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "availability_id") // La colonna di join che riferisce la tabella availability
    private Availability availability;

    @Override
    public String toString() {
        return "VolunteerPreferences{" +
                "city='" + city + '\'' +
                ", volunteerCategories=" + categories +
                '}';
    }
}

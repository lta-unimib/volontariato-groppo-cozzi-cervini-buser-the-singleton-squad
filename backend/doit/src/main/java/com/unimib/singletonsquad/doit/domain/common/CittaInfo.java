package com.unimib.singletonsquad.doit.domain.common;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CittaInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, name = "latitude")
    private double latitude;
    @Column(nullable = false, name = "longitude")
    private double longitude;
    @Column(nullable = false, unique = true, name="cityName")
    private String cityName;

}

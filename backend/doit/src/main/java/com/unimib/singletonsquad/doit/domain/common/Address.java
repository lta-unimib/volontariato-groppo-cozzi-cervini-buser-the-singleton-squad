package com.unimib.singletonsquad.doit.domain.common;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.util.Objects;
@Setter
@Getter
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;
    @Column(nullable = false)
    private String streetAddress;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String postalCode;
    private String houseNumber;
    @Column(nullable = true)
    private String additionalInformation;




    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Address location = (Address) o;
        return Objects.equals(id, location.id)
                && Objects.equals(city, location.city)
                && Objects.equals(streetAddress, location.streetAddress)
                && Objects.equals(postalCode, location.postalCode)
                && Objects.equals(houseNumber, location.houseNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, city, streetAddress, postalCode, houseNumber);
    }

    @Override
    public String toString() {
        return "Location{" +
                "id='" + id + '\'' +
                ", city='" + city + '\'' +
                ", streetAddress='" + streetAddress + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", houseNumber='" + houseNumber + '\'' +
                '}';
    }
}

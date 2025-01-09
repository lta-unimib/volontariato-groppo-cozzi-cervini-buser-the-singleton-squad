package com.unimib.singletonsquad.doit.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Objects;
@Setter
@Getter
@Entity
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String region;
    private String city;
    private String streetAddress;
    private String postalCode;
    private String country;
    private String houseNumber;
    private String phoneNumber;

    public Location(String id, String city, String streetAddress, String postalCode, String houseNumber) {
        this.id = id;
        this.city = city;
        this.streetAddress = streetAddress;
        this.postalCode = postalCode;
        this.houseNumber = houseNumber;
        this.country = "Italia";
        this.region = "Lombardia";
    }

    public Location() {

    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Location location = (Location) o;
        return Objects.equals(id, location.id) && Objects.equals(region, location.region) && Objects.equals(city, location.city) && Objects.equals(streetAddress, location.streetAddress) && Objects.equals(postalCode, location.postalCode) && Objects.equals(country, location.country) && Objects.equals(houseNumber, location.houseNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, region, city, streetAddress, postalCode, country, houseNumber);
    }

    @Override
    public String toString() {
        return "Location{" +
                "id='" + id + '\'' +
                ", region='" + region + '\'' +
                ", city='" + city + '\'' +
                ", streetAddress='" + streetAddress + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", country='" + country + '\'' +
                ", houseNumber='" + houseNumber + '\'' +
                '}';
    }
}

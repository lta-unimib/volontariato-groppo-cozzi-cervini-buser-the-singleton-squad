package com.unimib.singletonsquad.doit.Domain;

import java.util.Objects;

public class Location {
    private String id;
    private String region;
    private String city;
    private String streetAddress;
    private String postalCode;
    private String country;
    private String houseNumber;

    public Location(String id, String city, String streetAddress, String postalCode, String houseNumber) {
        this.id = id;
        this.city = city;
        this.streetAddress = streetAddress;
        this.postalCode = postalCode;
        this.houseNumber = houseNumber;
        this.country = "Italia";
        this.region = "Lombardia";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
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

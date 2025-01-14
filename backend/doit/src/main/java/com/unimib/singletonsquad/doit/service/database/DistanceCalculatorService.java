package com.unimib.singletonsquad.doit.service.database;

import org.springframework.stereotype.Service;

@Service
public class DistanceCalculatorService {

    private static final double EARTH_RADIUS = 6371.0; // Raggio della Terra in km

    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        // Convertiamo le latitudini e longitudini da gradi a radianti
        double phi1 = Math.toRadians(lat1);
        double phi2 = Math.toRadians(lat2);
        double deltaPhi = Math.toRadians(lat2 - lat1);
        double deltaLambda = Math.toRadians(lon2 - lon1);

        // Formula di Haversine
        double a = Math.pow(Math.sin(deltaPhi / 2), 2) + Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(deltaLambda / 2), 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Distanza in km
        return EARTH_RADIUS * c;
    }

    public double calculateDistance(String city1, String city2) {
        return 0;
    }
}
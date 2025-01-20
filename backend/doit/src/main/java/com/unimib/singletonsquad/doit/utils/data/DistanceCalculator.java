package com.unimib.singletonsquad.doit.utils.data;

public class DistanceCalculator {
    public static double calculateDistance(double x1, double y1, double x2, double y2) {
        // Calcola la differenza tra le coordinate x
        double deltaX = Math.abs(x2 - x1);

        // Calcola la differenza tra le coordinate y
        double deltaY = Math.abs(y2 - y1);

        // Usa il teorema di Pitagora per calcolare la distanza
        double distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

        return distance;
    }
}

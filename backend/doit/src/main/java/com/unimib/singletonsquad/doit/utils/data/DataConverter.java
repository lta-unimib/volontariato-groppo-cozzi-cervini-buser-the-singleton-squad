package com.unimib.singletonsquad.doit.utils.data;

public class DataConverter {

    private DataConverter() {
        throw new UnsupportedOperationException("Utility class");
    }

    public static String translateDayOfWeek(String dayOfWeek) {
        return switch (dayOfWeek) {
            case "MONDAY" -> "Lunedì";
            case "TUESDAY" -> "Martedì";
            case "WEDNESDAY" -> "Mercoledì";
            case "THURSDAY" -> "Giovedì";
            case "FRIDAY" -> "Venerdì";
            case "SATURDAY" -> "Sabato";
            case "SUNDAY" -> "Domenica";
            default -> dayOfWeek;
        };
    }
}

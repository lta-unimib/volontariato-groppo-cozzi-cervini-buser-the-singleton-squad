import { addMonths, eachDayOfInterval, getDay, startOfMonth } from "date-fns";
import { AvailabilityFormData } from "@/types/form/availability/availabilityFormData";


export const getSelectedDays = (availability: AvailabilityFormData, currentMonth: Date): Date[] => {
    const startOfCurrentMonth = startOfMonth(currentMonth);
    const endOfPreview = addMonths(startOfCurrentMonth, 12);

    switch (availability.mode) {
        case "daily":
            if (!availability.timeRange) return [];
            return eachDayOfInterval({
                start: startOfCurrentMonth,
                end: endOfPreview
            });
        case "weekly":
            if (!availability.timeRange) return [];
            const availableDays = availability.timeRange.map((day) => {
                const dayMapping: { [key: string]: number } = {
                    'Domenica': 0,
                    'Luned\u00EC': 1,
                    'Marted\u00EC': 2,
                    'Mercoled\u00EC': 3,
                    'Gioved\u00EC': 4,
                    'Venerd\u00EC': 5,
                    'Sabato': 6
                };
                return dayMapping[day];
            });
            return eachDayOfInterval({
                start: startOfCurrentMonth,
                end: endOfPreview
            }).filter(date => availableDays.includes(getDay(date)));
        case "monthly":
            if (!availability.timeRange) return [];
            const [startDate, endDate] = availability.timeRange.map((dateStr) => new Date(dateStr));
            return eachDayOfInterval({
                start: startOfCurrentMonth,
                end: endOfPreview
            }).filter(date => date.getDate() >= startDate.getDate() && date.getDate() <= endDate.getDate());
        default:
            return [];
    }
};
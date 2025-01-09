import { VolunteerFormData } from '@/types/formData';

export const isTimeInRange = (time: string, selectedTimeRange: string[]): boolean => {
    if (selectedTimeRange.length !== 2) return false;
    const [start, end] = selectedTimeRange;
    return time >= start && time <= end;
};

export const isAvailabilityValid = (
    mode: 'daily' | 'weekly' | 'monthly',
    timeRange: string[],
    weekDays: string[],
    dateRange: { from?: Date; to?: Date }
): boolean => {
    return (
        (mode === 'daily' && timeRange.length === 2) ||
        (mode === 'weekly' && weekDays.length > 0) ||
        (mode === 'monthly' && !!dateRange?.from && !!dateRange?.to)
    );
};

export const isFormValid = (formData: VolunteerFormData): boolean => {
    return (
        formData.availability !== null &&
        formData.city !== "" &&
        formData.preferences.length > 0 &&
        formData.description.trim().length > 0
    );
};
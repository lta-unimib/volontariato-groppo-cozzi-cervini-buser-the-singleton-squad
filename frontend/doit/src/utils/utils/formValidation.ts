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

export const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

export const validatePassword = (password: string): boolean => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;
    return passwordPattern.test(password);
};
export const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

export const validatePassword = (password: string): boolean => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;
    return passwordPattern.test(password);
};

export const validateVATNumber = (vat: string): boolean => {
    const vatPatterns = [
        /^(AT|BE|BG|CY|CZ|DE|DK|EE|ES|FI|FR)\d{8,12}$/,
        /^(HR|HU|IE|IT|LT|LU|LV|MT|NL|PL|PT)\d{8,12}$/,
        /^(RO|SE|SI|SK)\d{8,12}$/
    ];
    return vatPatterns.some(pattern => pattern.test(vat));
};

export const validateWebSite = (website: string): boolean => {
    const websiteRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;
    return websiteRegex.test(website);
};

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
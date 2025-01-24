/**
 * Validates an email address using a regular expression to check basic email structure.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} Returns `true` if the email is valid, otherwise `false`.
 */
export const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};

/**
 * Validates a password, ensuring it meets the requirements for at least one lowercase letter,
 * one uppercase letter, one digit, one special character, and a minimum length of 8 characters.
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} Returns `true` if the password is valid, otherwise `false`.
 */
export const validatePassword = (password: string): boolean => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;
    return passwordPattern.test(password);
};

/**
 * Validates a VAT number for EU countries based on different country-specific formats.
 *
 * @param {string} vat - The VAT number to validate.
 * @returns {boolean} Returns `true` if the VAT number is valid, otherwise `false`.
 */
export const validateVATNumber = (vat: string): boolean => {
    const vatPatterns = [
        /^(AT|BE|BG|CY|CZ|DE|DK|EE|ES|FI|FR)\d{8,12}$/,
        /^(HR|HU|IE|IT|LT|LU|LV|MT|NL|PL|PT)\d{8,12}$/,
        /^(RO|SE|SI|SK)\d{8,12}$/
    ];
    return vatPatterns.some(pattern => pattern.test(vat));
};

/**
 * Validates a website URL to ensure it follows the basic structure of a URL, including optional `http`/`https` and `www`.
 *
 * @param {string} website - The website URL to validate.
 * @returns {boolean} Returns `true` if the website is valid, otherwise `false`.
 */
export const validateWebSite = (website: string): boolean => {
    const websiteRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;
    return websiteRegex.test(website);
};

/**
 * Checks if a given time is within the specified range.
 *
 * @param {string} time - The time to check in `HH:mm` format.
 * @param {string[]} selectedTimeRange - An array of two times in `HH:mm` format representing the start and end of the time range.
 * @returns {boolean} Returns `true` if the time is within the range, otherwise `false`.
 */
export const isTimeInRange = (time: string, selectedTimeRange: string[]): boolean => {
    if (selectedTimeRange.length !== 2) return false;
    const [start, end] = selectedTimeRange;
    return time >= start && time <= end;
};

/**
 * Validates availability based on the selected mode (`daily`, `weekly`, or `monthly`),
 * ensuring that the appropriate parameters are set for each mode.
 *
 * @param {'daily' | 'weekly' | 'monthly'} mode - The mode for availability validation.
 * @param {string[]} timeRange - The time range selected for daily mode.
 * @param {string[]} weekDays - The selected weekdays for weekly mode.
 * @param {{ from?: Date, to?: Date }} dateRange - The date range for monthly mode.
 * @returns {boolean} Returns `true` if the availability is valid for the selected mode, otherwise `false`.
 */
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

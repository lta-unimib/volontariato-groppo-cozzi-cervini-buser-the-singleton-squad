/**
 * Validates a street address based on a regex pattern that allows letters, accents, spaces, apostrophes, and hyphens.
 *
 * @param {string} street - The street address to validate.
 * @returns {boolean} Returns `true` if the street address is valid, otherwise `false`.
 */
export const validateStreet = (street: string): boolean => {
    const streetRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
    return street.trim() !== "" && streetRegex.test(street.trim());
};

/**
 * Validates a street number based on a regex pattern that allows digits and optional letters or fractions (e.g., "123A", "45/B").
 *
 * @param {string} number - The street number to validate.
 * @returns {boolean} Returns `true` if the street number is valid, otherwise `false`.
 */
export const validateNumber = (number: string): boolean => {
    const numberRegex = /^\d+[A-Za-z]?(?:\/[A-Za-z])?$/;
    return number.trim() !== "" && numberRegex.test(number.trim());
};

/**
 * Validates a postal code, expecting exactly 5 digits.
 *
 * @param {string} postalCode - The postal code to validate.
 * @returns {boolean} Returns `true` if the postal code is valid, otherwise `false`.
 */
export const validatePostalCode = (postalCode: string): boolean => {
    const postalCodeRegex = /^\d{5}$/;
    return postalCodeRegex.test(postalCode);
};
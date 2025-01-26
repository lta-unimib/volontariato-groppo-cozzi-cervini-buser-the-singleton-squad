
export const validateStreet = (street: string): boolean => {
    const streetRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;
    return street.trim() !== "" && streetRegex.test(street.trim());
};


export const validateNumber = (number: string): boolean => {
    const numberRegex = /^\d+[A-Za-z]?(?:\/[A-Za-z])?$/;
    return number.trim() !== "" && numberRegex.test(number.trim());
};


export const validatePostalCode = (postalCode: string): boolean => {
    const postalCodeRegex = /^\d{5}$/;
    return postalCodeRegex.test(postalCode);
};
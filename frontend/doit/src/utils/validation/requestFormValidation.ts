/**
 * Validates if the categories array is not empty.
 *
 * @param {string[]} categories - The array of categories to validate.
 * @returns {boolean} Returns `true` if the categories array is not empty, otherwise `false`.
 */
export const validateCategories = (categories: string[]): boolean => {
    return categories.length > 0;
};

/**
 * Validates if the description is not an empty string.
 *
 * @param {string} description - The description to validate.
 * @returns {boolean} Returns `true` if the description is not empty, otherwise `false`.
 */
export const validateDescription = (description: string): boolean => {
    return description !== "";
};

/**
 * Validates if the volunteer capacity is a valid number and not an empty string.
 *
 * @param {string} capacity - The volunteer capacity to validate.
 * @returns {boolean} Returns `true` if the capacity is a valid number and not empty, otherwise `false`.
 */
export const validateVolunteerCapacity = (capacity: string): boolean => {
    return capacity !== "" && !isNaN(parseInt(capacity, 10));
};
export const validateDate = (date: string): boolean => {
    return date !== "";
};

export const validateCategories = (categories: string[]): boolean => {
    return categories.length > 0;
};

export const validateDescription = (description: string): boolean => {
    return description !== "";
};

export const validateVolunteerCapacity = (capacity: string): boolean => {
    return capacity !== "" && !isNaN(parseInt(capacity, 10));
};
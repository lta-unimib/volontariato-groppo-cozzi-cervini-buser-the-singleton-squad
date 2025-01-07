export const getInputClassName = (baseClassName: string, isInvalid?: boolean) => {
    return `${baseClassName} ${isInvalid ? 'border-red-500' : ''}`.trim();
};

export const formatFormData = (formData: any) => {
    return Object.entries(formData).reduce((acc, [key, value]) => {
        if (Array.isArray(value) && value.length === 0) {
            return acc;
        }
        if (value === '') {
            return acc;
        }
        return { ...acc, [key]: value };
    }, {});
};
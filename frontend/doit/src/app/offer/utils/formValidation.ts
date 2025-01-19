import {OfferFormData} from "@/types/formData";

export const isFormValid = (formData: OfferFormData): boolean => {
    return (
        formData.date != "" &&
        formData.address != "" &&
        formData.categories.length > 0 &&
        formData.activities.length > 0 &&
        formData.description != "" &&
        formData.volunteerCapacity != "" &&
        !isNaN(parseInt(formData.volunteerCapacity, 10))
    );
}
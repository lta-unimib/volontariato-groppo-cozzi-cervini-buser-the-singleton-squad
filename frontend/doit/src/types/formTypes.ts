import { AvailabilityData as DialogAvailabilityData } from "@/app/form/volunteer/components/AvailabilityPicker";

export interface BaseFormData {
    city: string;
    preferences: string[];
    description: string;
}

export interface OrganizationFormData extends BaseFormData {
    organizationName: string;
    VATNumber?: string;
    webSite?: string;
}

export interface VolunteerFormData extends BaseFormData {
    fullName: string;
    availability: DialogAvailabilityData | null;
}

export interface AddressData {
    street: string;
    number: string;
    city: string;
    postalCode: string;
    additionalInfo?: string;
}
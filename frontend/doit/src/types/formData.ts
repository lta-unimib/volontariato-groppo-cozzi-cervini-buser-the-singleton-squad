import {AvailabilityData} from "@/types/availabilityData";

export interface BaseFormData {
    id: string;
    description: string;
}

export interface BaseUserData extends BaseFormData{
    city: string;
    preferences: string[];
}

export interface OrganizationFormData extends BaseUserData {
    organizationName: string;
    VATNumber?: string;
    webSite?: string;
}

export interface VolunteerFormData extends BaseUserData {
    availability: AvailabilityData | null;
}

export interface OfferFormData extends BaseFormData{
    date: string;
    address: string;
    categories: string[];
    activities: string[];
    volunteerCapacity: string;
}
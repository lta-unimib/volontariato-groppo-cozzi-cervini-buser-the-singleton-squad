import { AvailabilityData } from "@/types/availabilityData";
import { AddressData } from "@/types/addressData";

export interface BaseFormData {
    email: string;
    password: string;
    description: string;
}

export interface BaseUserData extends BaseFormData {
    city: string;
    preferences: string[];
}

export interface OrganizationFormData extends BaseUserData {
    organizationName: string;
    VATNumber?: string;
    website?: string;
    role?: string;
}

export interface VolunteerFormData extends BaseUserData {
    firstName: string;
    lastName: string;
    availability: AvailabilityData | undefined;
    role?: string;
}

export interface RequestFormData {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    address: AddressData;
    categories: string[];
    frequency: string[];
    description: string;
    volunteerCapacity: string;
}
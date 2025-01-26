import {BaseFormData} from "@/types/form/baseFormData";

export interface RequestFormData extends Partial<BaseFormData> {
    title: string;
    timeRange: [string, string];
    address: {
        street: string;
        number: string;
        city: string;
        postalCode: string;
        additionalInfo: string;
    };
    categories: string[];
    description: string;
    volunteerCapacity: string;
    startTime: string;
    endTime: string;
}
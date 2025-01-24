import {BaseFormData} from "@/types/form/baseFormData";

/**
 * @interface RequestFormData
 * Represents the request form data.
 * Contains details about a specific request, such as title, time range, start and end times,
 * address, categories, description, and volunteer capacity.
 *
 * @param title The title of the request.
 * @param timeRange A tuple representing the start and end time of the request.
 * @param startTime The start time for the request.
 * @param endTime The end time for the request.
 * @param address The address for the request.
 * @param categories An array of categories associated with the request.
 * @param description A description of the request.
 * @param volunteerCapacity The maximum number of volunteers needed for the request.
 */
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
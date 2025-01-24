import { AddressFormData } from "../city/addressFormData";

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
export interface RequestFormData {
    readonly address: AddressFormData;
    readonly categories: string[];
    readonly description: string;
    readonly endTime: string;
    readonly startTime: string;
    readonly timeRange: [string, string];
    readonly title: string;
    readonly volunteerCapacity: string;
}
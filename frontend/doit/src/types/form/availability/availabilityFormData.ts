/**
 * Defines the possible modes of availability.
 * - "daily": The availability is on a daily basis.
 * - "weekly": The availability is on a weekly basis.
 * - "monthly": The availability is on a monthly basis.
 */
export type AvailabilityMode = "daily" | "weekly" | "monthly";

/**
 * @interface AvailabilityFormData
 * Represents the availability data for a volunteer.
 * Contains the mode of availability and the time range.
 *
 * @param mode The mode of availability, which can be "daily", "weekly", or "monthly".
 * @param timeRange The time range of availability, which can be a tuple of start and end times or an array of string time slots.
 */
export interface AvailabilityFormData {
    mode: AvailabilityMode;
    timeRange: [string, string] | string[];
}

/**
 * @interface AvailabilityDialogProps
 * Represents the props for the AvailabilityDialog component.
 * Contains a callback function for saving the availability data and optionally an initial selected availability data.
 *
 * @param onSaveAction A callback function that is called when the availability data is saved. It receives the availability data as an argument.
 * @param initialSelected (Optional) The initially selected availability data.
 */
export interface AvailabilityDialogProps {
    initialSelected?: AvailabilityFormData;
    onSaveAction: (availability: AvailabilityFormData) => void;
}
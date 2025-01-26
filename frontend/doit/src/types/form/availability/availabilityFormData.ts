
export type AvailabilityMode = "daily" | "weekly" | "monthly";


export interface AvailabilityFormData {
    mode: AvailabilityMode;
    timeRange: [string, string] | string[];
}


export interface AvailabilityDialogProps {
    initialSelected?: AvailabilityFormData;
    onSaveAction: (availability: AvailabilityFormData) => void;
}
export type AvailabilityMode = "daily" | "weekly" | "monthly";

export interface AvailabilityData {
    mode: AvailabilityMode;
    timeRange: [string, string] | string[];
}

export interface AvailabilityDialogProps {
    onSaveAction: (availability: AvailabilityData) => void;
    initialSelected?: AvailabilityData;
}
export type AvailabilityMode = "daily" | "weekly" | "monthly";

export interface AvailabilityDialogProps {
    onSaveAction: (availability: AvailabilityData) => void;
}

export interface AvailabilityData {
    mode: AvailabilityMode;
    timeRange: [string, string] | string[];
    weekDays?: string[];
    dateRange?: {
        from: Date;
        to: Date;
    };
}

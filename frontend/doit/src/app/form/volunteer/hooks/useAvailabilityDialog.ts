import { useState, useCallback } from 'react';
import { AvailabilityMode, AvailabilityData } from "@/types/availabilityData";
import { DateRange } from "react-day-picker";

export const useAvailabilityDialog = (onSave: (data: AvailabilityData) => void) => {
    const [open, setOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState<AvailabilityMode>('daily');
    const [selectedTimeRange, setSelectedTimeRange] = useState<string[]>([]);
    const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({ from: undefined, to: undefined });

    const resetSelections = useCallback(() => {
        setSelectedTimeRange([]);
        setSelectedWeekDays([]);
        setSelectedDateRange({ from: undefined, to: undefined });
    }, []);

    const handleModeChange = useCallback((mode: AvailabilityMode) => {
        setSelectedMode(mode);
        resetSelections();
    }, [resetSelections]);

    const handleSave = useCallback(() => {
        let selectedData: [string, string] | undefined;

        if (selectedMode === 'daily') {
            selectedData = selectedTimeRange.length === 2 ? selectedTimeRange as [string, string] : undefined;
        } else if (selectedMode === 'weekly') {
            selectedData = selectedWeekDays.length === 2 ? selectedWeekDays as [string, string] : undefined;
        } else {
            const { from, to } = selectedDateRange;
            if (from && to) {
                selectedData = [from.toISOString().substring(0, 10), to.toISOString().substring(0, 10)];
            }
        }

        if (selectedData) {
            onSave({ mode: selectedMode, timeRange: selectedData });
        }
        setOpen(false);
    }, [selectedMode, selectedTimeRange, selectedWeekDays, selectedDateRange, onSave]);



    const handleCancel = useCallback(() => {
        resetSelections();
        setOpen(false);
    }, [resetSelections]);

    return {
        open,
        setOpen,
        selectedMode,
        selectedTimeRange,
        selectedWeekDays,
        selectedDateRange,
        setSelectedTimeRange,
        setSelectedWeekDays,
        setSelectedDateRange,
        handleModeChange,
        handleSave,
        handleCancel
    };
};
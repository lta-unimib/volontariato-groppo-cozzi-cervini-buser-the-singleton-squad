import { useState, useCallback, useEffect } from 'react';
import { AvailabilityMode, AvailabilityData } from "@/types/availabilityData";
import { DateRange } from "react-day-picker";

export const useAvailabilityDialog = (
    onSave: (data: AvailabilityData) => void,
    defaultValue?: AvailabilityData
) => {
    const [open, setOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState<AvailabilityMode>(defaultValue?.mode || 'daily');
    const [selectedTimeRange, setSelectedTimeRange] = useState<string[]>(
        defaultValue?.mode === 'daily' ? (defaultValue.timeRange as string[]) : []
    );
    const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>(
        defaultValue?.mode === 'weekly' ? (defaultValue.timeRange as string[]) : []
    );
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(() => {
        if (defaultValue?.mode === 'monthly' && Array.isArray(defaultValue.timeRange)) {
            return {
                from: new Date(defaultValue.timeRange[0]),
                to: new Date(defaultValue.timeRange[1])
            };
        }
        return { from: undefined, to: undefined };
    });

    useEffect(() => {
        if (defaultValue) {
            setSelectedMode(defaultValue.mode);
            if (defaultValue.mode === 'daily') {
                setSelectedTimeRange(defaultValue.timeRange as string[]);
            } else if (defaultValue.mode === 'weekly') {
                setSelectedWeekDays(defaultValue.timeRange as string[]);
            } else if (defaultValue.mode === 'monthly' && Array.isArray(defaultValue.timeRange)) {
                setSelectedDateRange({
                    from: new Date(defaultValue.timeRange[0]),
                    to: new Date(defaultValue.timeRange[1])
                });
            }
        }
    }, [defaultValue]);

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
        let selectedData: [string, string] | string[] | undefined;

        if (selectedMode === 'daily') {
            selectedData = selectedTimeRange.length === 2 ? selectedTimeRange as [string, string] : undefined;
        } else if (selectedMode === 'weekly') {
            selectedData = selectedWeekDays.length > 0 ? selectedWeekDays : undefined;
        } else {
            const { from, to } = selectedDateRange;
            if (from && to) {
                selectedData = [from.toISOString().substring(0, 10), to.toISOString().substring(0, 10)];
            }
        }

        if (selectedData) {
            onSave({ mode: selectedMode, timeRange: selectedMode === 'weekly' ? selectedWeekDays : selectedData });
        }
        setOpen(false);
    }, [selectedMode, selectedTimeRange, selectedWeekDays, selectedDateRange, onSave]);

    const handleCancel = useCallback(() => {
        if (defaultValue) {
            setSelectedMode(defaultValue.mode);
            if (defaultValue.mode === 'daily') {
                setSelectedTimeRange(defaultValue.timeRange as string[]);
            } else if (defaultValue.mode === 'weekly') {
                setSelectedWeekDays(defaultValue.timeRange as string[]);
            } else if (defaultValue.mode === 'monthly' && Array.isArray(defaultValue.timeRange)) {
                setSelectedDateRange({
                    from: new Date(defaultValue.timeRange[0]),
                    to: new Date(defaultValue.timeRange[1])
                });
            }
        } else {
            resetSelections();
        }
        setOpen(false);
    }, [defaultValue, resetSelections]);

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
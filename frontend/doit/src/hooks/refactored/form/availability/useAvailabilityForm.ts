import { useState, useCallback, useEffect } from 'react';
import { AvailabilityMode, AvailabilityFormData } from "@/types/refactored/form/availability/availabilityFormData";
import { DateRange } from "react-day-picker";

const extractDateRange = (timeRange: any): DateRange => {
    if (Array.isArray(timeRange)) {
        return { from: new Date(timeRange[0]), to: new Date(timeRange[1]) };
    }
    return { from: undefined, to: undefined };
};

const modeHandlers = {
    daily: ({ selectedTimeRange }: { selectedTimeRange: string[] }) => (selectedTimeRange.length === 2 ? selectedTimeRange : undefined),
    weekly: ({ selectedWeekDays }: { selectedWeekDays: string[] }) => (selectedWeekDays.length > 0 ? selectedWeekDays : undefined),
    monthly: ({ selectedDateRange }: { selectedDateRange: DateRange }) => {
        const { from, to } = selectedDateRange;
        return from && to ? [from.toISOString().substring(0, 10), to.toISOString().substring(0, 10)] : undefined;
    }
};

export const useAvailabilityForm = (
    onSave: (data: AvailabilityFormData) => void,
    defaultValue?: AvailabilityFormData
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
            return extractDateRange(defaultValue.timeRange);
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
            } else if (defaultValue.mode === 'monthly') {
                setSelectedDateRange(extractDateRange(defaultValue.timeRange));
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
        const selectedData = modeHandlers[selectedMode]({
            selectedTimeRange,
            selectedWeekDays,
            selectedDateRange
        });
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
            } else if (defaultValue.mode === 'monthly') {
                setSelectedDateRange(extractDateRange(defaultValue.timeRange));
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
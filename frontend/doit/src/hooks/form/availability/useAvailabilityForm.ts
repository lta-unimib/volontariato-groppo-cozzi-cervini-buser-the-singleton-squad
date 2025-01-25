import { useState, useCallback, useEffect } from 'react';
import { AvailabilityMode, AvailabilityFormData } from "@/types/form/availability/availabilityFormData";
import { DateRange } from "react-day-picker";

/**
 * Extracts a DateRange from the provided time range.
 * @param {string[] | [string, string]} timeRange - The time range to be extracted.
 * @returns {DateRange} - The extracted DateRange object with `from` and `to` dates.
 */
const extractDateRange = (timeRange: string[] | [string, string]): DateRange => {
    if (timeRange.length === 2) {
        return { from: new Date(timeRange[0]), to: new Date(timeRange[1]) };
    }
    return { from: undefined, to: undefined };
};

/**
 * Handlers for different availability modes (daily, weekly, monthly).
 */
const modeHandlers = {
    /**
     * Handles the daily mode selection.
     * @param {object} param - The selected time range for the day.
     * @param {string[]} param.selectedTimeRange - The time range to be selected.
     * @returns - The selected time range or undefined.
     */
    daily: ({ selectedTimeRange }: { selectedTimeRange: string[] }) => (selectedTimeRange.length === 2 ? selectedTimeRange : undefined),

    /**
     * Handles the weekly mode selection.
     * @param {object} param - The selected weekdays for the week.
     * @param {string[]} param.selectedWeekDays - The selected weekdays.
     * @returns - The selected weekdays or undefined.
     */
    weekly: ({ selectedWeekDays }: { selectedWeekDays: string[] }) => (selectedWeekDays.length > 0 ? selectedWeekDays : undefined),

    /**
     * Handles the monthly mode selection.
     * @param {object} param - The selected date range for the month.
     * @param {DateRange} param.selectedDateRange - The selected date range.
     * @returns - The formatted date range or undefined.
     */
    monthly: ({ selectedDateRange }: { selectedDateRange: DateRange }) => {
        const { from, to } = selectedDateRange;
        return from && to ? [from.toISOString().substring(0, 10), to.toISOString().substring(0, 10)] : undefined;
    }
};

/**
 * Custom hook to manage the availability form state and logic.
 * @param {Function} onSave - The function to call when the form is saved.
 * @param {AvailabilityFormData} [defaultValue] - Default values for the form.
 * @returns - The availability form state and handlers.
 */
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

    /**
     * Reset the selection state to default values.
     */
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

    /**
     * Reset all selections to an empty state.
     */
    const resetSelections = useCallback(() => {
        setSelectedTimeRange([]);
        setSelectedWeekDays([]);
        setSelectedDateRange({ from: undefined, to: undefined });
    }, []);

    /**
     * Handle the change of the selected availability mode.
     * @param {AvailabilityMode} mode - The selected mode to switch to.
     */
    const handleModeChange = useCallback((mode: AvailabilityMode) => {
        setSelectedMode(mode);
        resetSelections();
    }, [resetSelections]);

    /**
     * Save the current availability form data and call the `onSave` function.
     */
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

    /**
     * Cancel the form changes and revert to the default values (if any).
     */
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
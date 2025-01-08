"use client"

import { useState } from 'react';
import {AvailabilityMode, AvailabilityData} from "@/types/availabilityData";
import {DateRange} from "react-day-picker";

export const useAvailabilityDialog = (onSave: (data: AvailabilityData) => void) => {
    const [open, setOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState<AvailabilityMode>('daily');
    const [selectedTimeRange, setSelectedTimeRange] = useState<string[]>([]);
    const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
        from: undefined,
        to: undefined
    });

    const resetSelections = () => {
        setSelectedTimeRange([]);
        setSelectedWeekDays([]);
        setSelectedDateRange({ from: undefined, to: undefined });
    };

    const handleModeChange = (mode: AvailabilityMode) => {
        setSelectedMode(mode);
        resetSelections();
    };

    const handleSave = () => {
        let selectedData;

        if (selectedMode === 'daily') {
            selectedData = selectedTimeRange;
        } else if (selectedMode === 'weekly') {
            selectedData = selectedWeekDays;
        } else {
            const { from, to } = selectedDateRange;
            selectedData = [from?.toISOString().substring(0, 10) || null, to?.toISOString().substring(0, 10) || null];
        }

        const data = {
            mode: selectedMode,
            data: selectedData
        };

        onSave(data);
        setOpen(false);
    };

    const handleCancel = () => {
        resetSelections();
        setOpen(false);
    };

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
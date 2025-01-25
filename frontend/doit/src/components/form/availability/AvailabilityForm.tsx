import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/core/Dialog";
import { Button } from "@/components/core/Button";
import { ScrollArea } from "@/components/core/ScrollArea";
import { Calendar } from "@/components/form/availability/Calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/core/Tabs";
import { cn } from "@/utils/cnUtils";
import { MdCalendarMonth } from "react-icons/md";
import { useAvailabilityForm } from '@/hooks/form/availability/useAvailabilityForm';
import { timeSlots, weekDays, getDisplayText } from '@/utils/components/timeSlots';
import { AvailabilityMode, AvailabilityDialogProps } from "@/types/form/availability/availabilityFormData";
import { DateRange } from "react-day-picker";
import { isAvailabilityValid, isTimeInRange } from '@/utils/validation/registrationFormValidation';

const MODES = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly'
};

/**
 * Component to handle time selection for daily availability mode.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.selectedTimeRange - The currently selected time range.
 * @param {(time: string) => void} props.handleTimeSelect - Function to handle time selection.
 */
const TimeSelection = ({
                           selectedTimeRange,
                           handleTimeSelect
                       }: {
    selectedTimeRange: string[];
    handleTimeSelect: (time: string) => void;
}) =>  (
    <ScrollArea className="h-[348px] w-full rounded-2xl border">
        <div className="grid grid-cols-3 gap-2 p-4">
            {timeSlots.map((time) => (
                <Button
                    key={time}
                    variant={isTimeInRange(time, selectedTimeRange) ? "default" : "outline"}
                    onClick={() => handleTimeSelect(time)}
                    className={cn(
                        "rounded-full w-full",
                        selectedTimeRange.includes(time) && "bg-primary text-primary-foreground"
                    )}
                >
                    {time}
                </Button>
            ))}
        </div>
    </ScrollArea>
);

/**
 * Component to handle week day selection for weekly availability mode.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.selectedWeekDays - The currently selected week days.
 * @param {(day: string) => void} props.handleWeekDaySelect - Function to handle week day selection.
 */
const WeekDaySelection = ({
                              selectedWeekDays,
                              handleWeekDaySelect
                          }: {
    selectedWeekDays: string[];
    handleWeekDaySelect: (day: string) => void;
}) => (
    <div className="h-[348px] w-full rounded-2xl border flex flex-col gap-2 p-4">
        {weekDays.map((day) => (
            <Button
                key={day}
                variant={selectedWeekDays.includes(day) ? "default" : "outline"}
                onClick={() => handleWeekDaySelect(day)}
                className="rounded-full w-full"
            >
                {day}
            </Button>
        ))}
    </div>
);

/**
 * Component to handle date range selection for monthly availability mode.
 *
 * @param {Object} props - The component props.
 * @param {DateRange | undefined} props.selectedDateRange - The currently selected date range.
 * @param {React.Dispatch<React.SetStateAction<DateRange | undefined>>} props.setSelectedDateRange - Function to set the selected date range.
 */
const DateSelection = ({
                           selectedDateRange,
                           setSelectedDateRange
                       }: {
    selectedDateRange: DateRange | undefined;
    setSelectedDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}) => (
    <div className="flex justify-center h-[348px] w-full rounded-2xl border p-4">
        <Calendar
            mode="range"
            selected={selectedDateRange}
            onSelect={(range: DateRange | undefined) => {
                if (range?.from && range?.to) {
                    const adjustedTo = new Date(range.to.setHours(23, 59, 59, 999));
                    setSelectedDateRange({ from: range.from, to: adjustedTo });
                } else if (range?.from) {
                    setSelectedDateRange({ from: range.from, to: undefined });
                } else {
                    setSelectedDateRange(undefined);
                }
            }}
            className="rounded-md"
        />
    </div>
);

/**
 * Main component to render the availability dialog for selecting availability.
 *
 * @param props - The component props.
 * @param props.onSaveAction - The function to call when the user saves the availability.
 * @param props.initialSelected - The initial selected availability data.
 */
export const AvailabilityDialog: React.FC<AvailabilityDialogProps> = ({
                                                                          onSaveAction,
                                                                          initialSelected
                                                                      }) => {
    const {
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
    } = useAvailabilityForm(onSaveAction, initialSelected);

    /**
     * Handles the selection of a time range.
     *
     * @param {string} time - The selected time.
     */
    const handleTimeSelect = (time: string) => {
        let updatedTimeRange = [...selectedTimeRange];
        if (updatedTimeRange.length === 2) {
            updatedTimeRange = [time];
        } else if (updatedTimeRange.length === 1) {
            const [start] = updatedTimeRange;
            const end = time;
            updatedTimeRange = start <= end ? [start, end] : [end, start];
        } else {
            updatedTimeRange = [time];
        }
        setSelectedTimeRange(updatedTimeRange);
    };

    /**
     * Handles the selection of a week day.
     *
     * @param {string} day - The selected day.
     */
    const handleWeekDaySelect = (day: string) => {
        setSelectedWeekDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    /**
     * Checks if the save button should be disabled based on the selected availability.
     *
     * @returns - Whether the save button is disabled.
     */
    const isSaveDisabled = () => {
        return (
            (selectedMode === MODES.DAILY && selectedTimeRange.length !== 2) ||
            (selectedMode === MODES.WEEKLY && selectedWeekDays.length === 0) ||
            (selectedMode === MODES.MONTHLY && (!selectedDateRange?.from || !selectedDateRange?.to))
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal rounded-full",
                        isAvailabilityValid(selectedMode, selectedTimeRange, selectedWeekDays, selectedDateRange)
                            ? "text-foreground"
                            : "text-muted-foreground"
                    )}
                >
                    <MdCalendarMonth className="mr-2 h-5 w-5" />
                    {getDisplayText(selectedMode, selectedTimeRange, selectedWeekDays, selectedDateRange)}
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[90%] sm:max-w-[425px] w-full p-6 sm:mx-0 rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Seleziona Disponibilità</DialogTitle>
                </DialogHeader>

                <Tabs value={selectedMode} onValueChange={(value) => handleModeChange(value as AvailabilityMode)} className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-3 rounded-full p-1">
                        {Object.values(MODES).map((mode) => (
                            <TabsTrigger key={mode} value={mode} className="rounded-full">
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value={MODES.DAILY} className="mt-4">
                        <TimeSelection selectedTimeRange={selectedTimeRange} handleTimeSelect={handleTimeSelect} />
                    </TabsContent>

                    <TabsContent value={MODES.WEEKLY} className="mt-4">
                        <WeekDaySelection selectedWeekDays={selectedWeekDays} handleWeekDaySelect={handleWeekDaySelect} />
                    </TabsContent>

                    <TabsContent value={MODES.MONTHLY} className="mt-4">
                        <DateSelection selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange as React.Dispatch<React.SetStateAction<DateRange | undefined>>} />
                    </TabsContent>
                </Tabs>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={handleCancel}
                        className="w-full sm:w-auto rounded-full"
                    >
                        Annulla
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="w-full sm:w-auto rounded-full"
                        disabled={isSaveDisabled()}
                    >
                        Salva
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
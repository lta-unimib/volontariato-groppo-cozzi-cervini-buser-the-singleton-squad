import React, { useState } from "react"
import { format, isBefore, startOfDay, isAfter, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/core/Button"
import { Calendar, DateRange as DayPickerDateRange } from "@/components/form/availability/Calendar"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/core/Dialog"
import DateSelector from "./DateSelector"

/**
 * Represents a date range with a `from` and `to` date.
 */
interface DateRange {
    from: Date | undefined
    to: Date | undefined
}

/**
 * Props for the `DatePickerDialog` component.
 * @param onSaveAction - Callback function to handle saving the selected date range.
 * @param initialDates - Optional initial dates as an array of strings in "yyyy-MM-dd" format.
 */
interface DatePickerDialogProps {
    onSaveAction: (from: Date, to: Date) => void
    initialDates?: [string, string]
}

/**
 * A dialog component for selecting a date range. It allows users to pick a start date and end date,
 * with validation for selecting valid ranges.
 *
 * @param {DatePickerDialogProps} props - The props for the `DatePickerDialog` component.
 * @returns The rendered date picker dialog.
 */
export function DatePickerDialog({ onSaveAction, initialDates }: DatePickerDialogProps) {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(
        initialDates
            ? {
                from: parse(initialDates[0], 'yyyy-MM-dd', new Date()),
                to: parse(initialDates[1], 'yyyy-MM-dd', new Date())
            }
            : undefined
    )
    const [currentMonth, setCurrentMonth] = useState<Date | undefined>(
        initialDates
            ? parse(initialDates[0], 'yyyy-MM-dd', new Date())
            : undefined
    )
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Years and months for the date picker selector.
    const years = Array.from({ length: 124 }, (_, i) => new Date().getFullYear() - i)
    const months = [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ]

    /**
     * Validates the selected date range.
     * @param {DateRange | undefined} range - The selected date range to validate.
     * @returns An error message if invalid, otherwise null.
     */
    const validateDateRange = (range: DateRange | undefined) => {
        const today = startOfDay(new Date())

        if (range?.from && isBefore(range.from, today)) {
            return "Non è possibile selezionare una data di inizio precedente a oggi"
        }

        if (range?.from && range?.to && isAfter(range.from, range.to)) {
            return "La data di inizio non può essere successiva alla data di fine"
        }

        return null
    }

    /**
     * Updates all states related to the date range, including error messages and selected dates.
     * @param {DayPickerDateRange | undefined} range - The selected date range.
     */
    const updateAllStates = (range: DayPickerDateRange | undefined) => {
        const convertedRange: DateRange | undefined = range ? {
            from: range.from,
            to: range.to
        } : undefined

        const validationError = validateDateRange(convertedRange)
        setError(validationError)
        setDateRange(convertedRange)
        setCurrentMonth(convertedRange?.from || convertedRange?.to)
    }

    // Determines if the selected date range is valid.
    const isDateRangeValid = dateRange?.from && dateRange?.to &&
        !isBefore(dateRange.from, startOfDay(new Date())) &&
        !isBefore(dateRange.to, dateRange.from)

    /**
     * Handles the save action when the user clicks on the "Salva" button.
     * If the date range is valid, it triggers the `onSaveAction` callback.
     */
    const handleSave = () => {
        if (dateRange?.from && dateRange?.to && isDateRangeValid) {
            onSaveAction(dateRange.from, dateRange.to)
            setIsOpen(false)
        }
    }

    /**
     * Handles the cancel action, resetting the form and closing the dialog.
     */
    const handleCancel = () => {
        setDateRange(undefined)
        setError(null)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal rounded-full ${
                        dateRange?.from && dateRange?.to ? "text-foreground" : "text-muted-foreground"
                    }`}
                >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <span>
                        {dateRange?.from && dateRange?.to
                            ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`
                            : "Seleziona il periodo"}
                    </span>
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[90%] sm:max-w-[425px] w-full p-6 sm:mx-0 rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Seleziona il periodo</DialogTitle>
                </DialogHeader>

                <DateSelector
                    fromDate={dateRange?.from}
                    toDate={dateRange?.to}
                    months={months}
                    years={years}
                    updateAllStates={updateAllStates}
                />

                {error && <p className="text-destructive text-sm text-center mt-2">{error}</p>}

                <div className="flex justify-center mt-4">
                    <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={updateAllStates}
                        month={currentMonth}
                        onMonthChange={setCurrentMonth}
                        initialFocus
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                        disabled={(date) => isBefore(date, startOfDay(new Date()))}
                        numberOfMonths={1}
                    />
                </div>

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
                        disabled={!isDateRangeValid}
                    >
                        Salva
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
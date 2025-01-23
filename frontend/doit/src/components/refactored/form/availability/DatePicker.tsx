import React, { useState } from "react"
import { format, isBefore, startOfDay, isAfter, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Calendar, DateRange as DayPickerDateRange } from "@/components/refactored/form/availability/Calendar"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog"
import DateSelector from "./DateSelector"

interface DateRange {
    from: Date | undefined
    to: Date | undefined
}

interface DatePickerDialogProps {
    onSaveAction: (from: Date, to: Date) => void
    initialDates?: [string, string]
}

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

    const years = Array.from({ length: 124 }, (_, i) => new Date().getFullYear() - i)
    const months = [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ]

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

    const isDateRangeValid = dateRange?.from && dateRange?.to &&
        !isBefore(dateRange.from, startOfDay(new Date())) &&
        !isBefore(dateRange.to, dateRange.from)

    const handleSave = () => {
        if (dateRange?.from && dateRange?.to && isDateRangeValid) {
            onSaveAction(dateRange.from, dateRange.to)
            setIsOpen(false)
        }
    }

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
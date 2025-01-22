import * as React from "react"
import { format, isBefore, startOfDay, isAfter } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Calendar, type DateRange } from "@/components/ui/date/Calendar"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog"
import DateSelector from "@/app/request/components/DateSelector"

export function DatePickerDialog({ onSaveAction }: { readonly onSaveAction: (from: Date, to: Date) => void }) {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined)
    const [currentMonth, setCurrentMonth] = React.useState<Date | undefined>(undefined)
    const [isOpen, setIsOpen] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const updateAllStates = (range: DateRange | undefined) => {
        const today = startOfDay(new Date())
        if (range?.from && isBefore(range.from, today)) {
            setError("Non è possibile selezionare una data di inizio precedente a oggi")
        } else if (range?.from && range?.to && isAfter(range.from, range.to)) {
            setError("La data di inizio non può essere successiva alla data di fine")
        } else {
            setError(null)
        }
        setDateRange(range)
        setCurrentMonth(range?.from || range?.to)
    }

    const years = Array.from({ length: 124 }, (_, i) => new Date().getFullYear() - i)

    const months = [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
    ]

    const isDateRangeValid =
        dateRange?.from &&
        dateRange?.to &&
        !isBefore(dateRange.from, startOfDay(new Date())) &&
        !isBefore(dateRange.to, dateRange.from)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal rounded-full ${dateRange?.from && dateRange?.to ? "text-foreground" : "text-muted-foreground"}`}
                    onClick={() => setIsOpen(true)}
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
                        onSelect={(newRange) => {
                            updateAllStates(newRange)
                        }}
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
                        onClick={() => {
                            setDateRange(undefined)
                            setError(null)
                            setIsOpen(false)
                        }}
                        className="w-full sm:w-auto rounded-full"
                    >
                        Annulla
                    </Button>

                    <Button
                        onClick={() => {
                            if (dateRange?.from && dateRange?.to && isDateRangeValid) {
                                onSaveAction(dateRange.from, dateRange.to)
                                setIsOpen(false)
                            }
                        }}
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
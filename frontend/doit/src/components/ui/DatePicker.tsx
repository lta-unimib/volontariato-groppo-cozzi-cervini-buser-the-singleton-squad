"use client"
import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/Button"
import { Calendar } from "@/components/ui/Calendar"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/Dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/Select"

export function DatePickerDialog({ onSaveAction }: { onSaveAction: (date: Date) => void }) {
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [currentMonth, setCurrentMonth] = React.useState<Date | undefined>(undefined)
    const [day, setDay] = React.useState<string | undefined>(undefined)
    const [month, setMonth] = React.useState<string | undefined>(undefined)
    const [year, setYear] = React.useState<string | undefined>(undefined)
    const [isOpen, setIsOpen] = React.useState(false)

    const updateAllStates = (newDate: Date) => {
        setDate(newDate)
        setCurrentMonth(newDate)
        setDay(newDate.getDate().toString())
        setMonth(months[newDate.getMonth()])
        setYear(newDate.getFullYear().toString())
    }

    const years = Array.from({ length: 124 }, (_, i) => new Date().getFullYear() - i)
    const months = [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ]

    const DateSelector = () => (
        <div className="flex flex-wrap justify-center gap-2 p-3">
            <Select value={day} onValueChange={(value) => {
                const newDate = new Date(date || new Date())
                newDate.setDate(parseInt(value))
                updateAllStates(newDate)
            }}>
                <SelectTrigger className="w-full sm:w-[100px] px-4 rounded-full">
                    <SelectValue placeholder="Giorno" />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                            {day}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={month} onValueChange={(value) => {
                const newDate = new Date(date || new Date())
                newDate.setMonth(months.indexOf(value))
                updateAllStates(newDate)
            }}>
                <SelectTrigger className="w-full sm:w-[120px] px-4 rounded-full">
                    <SelectValue placeholder="Mese" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((month) => (
                        <SelectItem key={month} value={month}>
                            {month}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={year} onValueChange={(value) => {
                const newDate = new Date(date || new Date())
                newDate.setFullYear(parseInt(value))
                updateAllStates(newDate)
            }}>
                <SelectTrigger className="w-full sm:w-[100px] px-4 rounded-full">
                    <SelectValue placeholder="Anno" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal rounded-full ${date ? 'text-foreground' : 'text-muted-foreground'}`}
                    onClick={() => setIsOpen(true)}
                >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <span>
    {date ? format(date, "dd/MM/yyyy") : "Seleziona la data di nascita"}
  </span>
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[90%] sm:max-w-[425px] w-full p-6 sm:mx-0 rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Seleziona una data</DialogTitle>
                </DialogHeader>

                <DateSelector />
                <div className="flex justify-center mt-4">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                            if (newDate) {
                                updateAllStates(newDate)
                            }
                        }}
                        month={currentMonth}
                        onMonthChange={setCurrentMonth}
                        initialFocus
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                    />
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button variant="outline" onClick={() => {
                        setDate(undefined)
                        setIsOpen(false)
                    }} className="w-full sm:w-auto rounded-full">
                        Annulla
                    </Button>
                    <Button onClick={() => {
                        if (date) {
                            onSaveAction(date)
                        }
                        setIsOpen(false)
                    }} className="w-full sm:w-auto rounded-full" disabled={!date}>
                        Salva
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
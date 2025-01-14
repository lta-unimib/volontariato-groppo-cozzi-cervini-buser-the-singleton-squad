import * as React from "react";
import { format, isBefore, startOfDay } from "date-fns";
import { CalendarIcon } from 'lucide-react';
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/date/Calendar";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import DateSelector from "./DateSelector";

export function DatePickerDialog({ onSaveAction }: { readonly onSaveAction: (date: Date) => void }) {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [currentMonth, setCurrentMonth] = React.useState<Date | undefined>(undefined);
    const [isOpen, setIsOpen] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const updateAllStates = (newDate: Date) => {
        const today = startOfDay(new Date());
        if (isBefore(newDate, today)) {
            setError("Non è possibile selezionare una data precedente a oggi");
        } else {
            setError(null);
        }
        setDate(newDate);
        setCurrentMonth(newDate);
    };

    const years = Array.from({ length: 124 }, (_, i) => new Date().getFullYear() - i);

    const months = [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];

    const isDateValid = date ? !isBefore(date, startOfDay(new Date())) : false;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal rounded-full ${date ? 'text-foreground' : 'text-muted-foreground'}`}
                    onClick={() => setIsOpen(true)}
                >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <span>{date ? format(date, "dd/MM/yyyy") : "Seleziona la data"}</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[90%] sm:max-w-[425px] w-full p-6 sm:mx-0 rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Seleziona una data</DialogTitle>
                </DialogHeader>

                <DateSelector
                    day={date?.getDate().toString()}
                    month={months[date?.getMonth() ?? 0]}
                    year={date?.getFullYear().toString()}
                    months={months}
                    years={years}
                    date={date}
                    updateAllStates={updateAllStates}
                />

                {error && (
                    <p className="text-destructive text-sm text-center mt-2">{error}</p>
                )}

                <div className="flex justify-center mt-4">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                            if (newDate) {
                                updateAllStates(newDate);
                            }
                        }}
                        month={currentMonth}
                        onMonthChange={setCurrentMonth}
                        initialFocus
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                        disabled={(date) => isBefore(date, startOfDay(new Date()))}
                    />
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button variant="outline" onClick={() => {
                        setDate(undefined);
                        setError(null);
                        setIsOpen(false);
                    }} className="w-full sm:w-auto rounded-full">
                        Annulla
                    </Button>

                    <Button onClick={() => {
                        if (date && isDateValid) {
                            onSaveAction(date);
                            setIsOpen(false);
                        }
                    }} className="w-full sm:w-auto rounded-full" disabled={!date || !isDateValid}>
                        Salva
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
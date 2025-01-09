import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

interface DateSelectorProps {
    readonly day: string | undefined;
    readonly month: string | undefined;
    readonly year: string | undefined;
    readonly months: string[];
    readonly years: number[];
    readonly date: Date | undefined;
    readonly updateAllStates: (newDate: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
                                                       day,
                                                       month,
                                                       year,
                                                       months,
                                                       years,
                                                       date,
                                                       updateAllStates,
                                                   }) => (
    <div className="flex flex-wrap justify-center gap-2 p-3">
        <Select value={day} onValueChange={(value) => {
            const newDate = new Date(date || new Date());
            newDate.setDate(parseInt(value));
            updateAllStates(newDate);
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
            const newDate = new Date(date || new Date());
            newDate.setMonth(months.indexOf(value));
            updateAllStates(newDate);
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
            const newDate = new Date(date || new Date());
            newDate.setFullYear(parseInt(value));
            updateAllStates(newDate);
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
);

export default DateSelector;
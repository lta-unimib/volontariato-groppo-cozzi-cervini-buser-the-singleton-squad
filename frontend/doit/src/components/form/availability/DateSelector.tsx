import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/core/Select"

interface DateRange {
    from: Date | undefined
    to: Date | undefined
}

interface DateRangeSelectorProps {
    fromDate: Date | undefined
    toDate: Date | undefined
    months: string[]
    years: number[]
    updateAllStates: (range: DateRange | undefined) => void
}

export default function DateSelector({
                                         fromDate,
                                         toDate,
                                         months,
                                         years,
                                         updateAllStates,
                                     }: DateRangeSelectorProps) {

    const updateDate = (type: "from" | "to", field: "day" | "month" | "year", value: string) => {
        const currentRange = { from: fromDate, to: toDate }
        const date = type === "from" ? currentRange.from || new Date() : currentRange.to || new Date()
        const newDate = new Date(date)

        switch (field) {
            case "day":
                newDate.setDate(Number.parseInt(value))
                break
            case "month":
                newDate.setMonth(months.indexOf(value))
                break
            case "year":
                newDate.setFullYear(Number.parseInt(value))
                break
        }

        updateAllStates({
            ...currentRange,
            [type]: newDate,
        })
    }

    const renderSelect = (type: "from" | "to", field: "day" | "month" | "year") => {
        const date = type === "from" ? fromDate : toDate
        const value = date
            ? field === "day"
                ? date.getDate().toString()
                : field === "month"
                    ? months[date.getMonth()]
                    : date.getFullYear().toString()
            : ""

        const options =
            field === "day"
                ? Array.from({ length: 31 }, (_, i) => (i + 1).toString())
                : field === "month"
                    ? months
                    : years.map(String)

        return (
            <Select
                onValueChange={(value) => updateDate(type, field, value)}
                value={value}
            >
                <SelectTrigger className="w-full rounded-full">
                    <SelectValue
                        placeholder={
                            field === "day"
                                ? "Giorno"
                                : field === "month"
                                    ? "Mese"
                                    : "Anno"
                        }
                    />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        )
    }

    return (
        <div className="grid grid-cols-3 gap-2">
            <div className="col-span-3 text-sm text-muted-foreground mb-1 mt-4">
                Data di inizio:
            </div>
            {renderSelect("from", "day")}
            {renderSelect("from", "month")}
            {renderSelect("from", "year")}
            <div className="col-span-3 text-sm text-muted-foreground mb-1 mt-4">
                Data di fine:
            </div>
            {renderSelect("to", "day")}
            {renderSelect("to", "month")}
            {renderSelect("to", "year")}
        </div>
    )
}
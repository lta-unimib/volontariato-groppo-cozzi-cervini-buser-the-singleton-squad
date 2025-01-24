import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/core/Select"

/**
 * Represents a date range with a `from` and `to` date.
 */
interface DateRange {
    from: Date | undefined
    to: Date | undefined
}

/**
 * Props for the `DateSelector` component.
 * @param fromDate - The starting date of the range.
 * @param toDate - The ending date of the range.
 * @param months - An array of month names.
 * @param years - An array of years to select from.
 * @param updateAllStates - Function to update the selected date range.
 */
interface DateRangeSelectorProps {
    fromDate: Date | undefined
    toDate: Date | undefined
    months: string[]
    years: number[]
    updateAllStates: (range: DateRange | undefined) => void
}

/**
 * A selector component for selecting the day, month, and year for a date range.
 * It allows the user to choose the start and end dates by selecting day, month, and year.
 *
 * @param {DateRangeSelectorProps} props - The props for the `DateSelector` component.
 * @returns The rendered date range selector.
 */
export default function DateSelector({
                                         fromDate,
                                         toDate,
                                         months,
                                         years,
                                         updateAllStates,
                                     }: DateRangeSelectorProps) {
    /**
     * Updates the date of either the start or end date based on the selected field (day, month, or year).
     *
     * @param {("from" | "to")} type - The type of date to update (start or end).
     * @param {("day" | "month" | "year")} field - The field to update (day, month, or year).
     * @param {string} value - The new value for the selected field.
     */
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

    /**
     * Renders a `Select` component for selecting day, month, or year for the start or end date.
     *
     * @param {("from" | "to")} type - The type of date to select (start or end).
     * @param {("day" | "month" | "year")} field - The field to render (day, month, or year).
     * @returns The rendered `Select` component for the specified field.
     */
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
import React, { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/core/Select"
import { Label } from "@/components/core/Label"

/**
 * Props for the `TimePicker` component.
 * @param label - The label to display for the time picker.
 * @param initialTime - The initial time to pre-select (in "hh:mm AM/PM" format).
 * @param onChange - A callback function that is called when the time is changed. It passes the updated time as a string ("hh:mm AM/PM").
 */
interface TimePickerProps {
    label: string
    initialTime?: string
    onChange?: (time: string) => void
}

/**
 * TimePicker component that allows users to select a time with hour, minute, and AM/PM.
 *
 * @param {TimePickerProps} props - The props for the `TimePicker` component.
 * @returns {JSX.Element} The rendered time picker component.
 */
export function TimePicker({ label, initialTime, onChange }: TimePickerProps) {
    /**
     * Parses a time string in "hh:mm AM/PM" format and returns an object with hour, minute, and period (AM/PM).
     * @param {string} [timeStr] - The time string to parse.
     * @returns {Object} The parsed time object containing hour, minute, and period.
     */
    const parseTime = (timeStr?: string) => {
        if (!timeStr) return { hour: "12", minute: "00", period: "AM" }

        const match = timeStr.match(/(\d{2}):(\d{2})\s*(AM|PM)/i)
        if (match) {
            const [, h, m, p] = match
            return { hour: h, minute: m, period: p.toUpperCase() }
        }
        return { hour: "12", minute: "00", period: "AM" }
    }

    const initialParsed = parseTime(initialTime)
    const [hour, setHour] = useState(initialParsed.hour)
    const [minute, setMinute] = useState(initialParsed.minute)
    const [period, setPeriod] = useState(initialParsed.period)

    /**
     * Effect hook to trigger the `onChange` callback whenever the hour, minute, or period changes.
     */
    useEffect(() => {
        const formattedTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')} ${period}`
        onChange?.(formattedTime)
    }, [hour, minute, period, onChange])

    /**
     * Renders a `Select` component for choosing hour, minute, or period (AM/PM).
     * @param {string} value - The current value to be selected.
     * @param {string[]} options - The list of available options to select from.
     * @param {Function} onValueChange - The function to call when the value changes.
     * @param {string} placeholder - The placeholder text for the select input.
     * @returns The rendered `Select` component.
     */
    const renderSelect = (
        value: string,
        options: string[],
        onValueChange: (value: string) => void,
        placeholder: string
    ) => (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
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

    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"))
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))
    const periods = ["AM", "PM"]

    return (
        <div className="flex flex-col space-y-2">
            <Label>{label}</Label>
            <div className="flex space-x-2">
                {renderSelect(hour, hours, setHour, "Hour")}
                {renderSelect(minute, minutes, setMinute, "Minute")}
                {renderSelect(period, periods, setPeriod, "AM/PM")}
            </div>
        </div>
    )
}

import React, { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/core/Select"
import { Label } from "@/components/core/Label"

interface TimePickerProps {
    label: string
    initialTime?: string
    onChange?: (time: string) => void
}

export function TimePicker({ label, initialTime, onChange }: TimePickerProps) {
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

    useEffect(() => {
        const formattedTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')} ${period}`
        onChange?.(formattedTime)
    }, [hour, minute, period, onChange])

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
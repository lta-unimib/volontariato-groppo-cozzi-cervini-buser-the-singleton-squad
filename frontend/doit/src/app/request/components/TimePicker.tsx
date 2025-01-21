"use client"

import React, { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Label } from "@/components/ui/Label"

interface TimePickerProps {
    label: string;
    onChange?: (time: string) => void;
}

export function TimePicker({ label, onChange }: TimePickerProps) {
    const [hour, setHour] = useState<string>("12");
    const [minute, setMinute] = useState<string>("00");
    const [period, setPeriod] = useState<string>("AM");

    const handleHourChange = (value: string) => {
        setHour(value);
        updateTime(value, minute, period);
    };

    const handleMinuteChange = (value: string) => {
        setMinute(value);
        updateTime(hour, value, period);
    };

    const handlePeriodChange = (value: string) => {
        setPeriod(value);
        updateTime(hour, minute, value);
    };

    const updateTime = (h: string, m: string, p: string) => {
        const formattedTime = `${h}:${m} ${p}`;
        onChange && onChange(formattedTime);
    };

    return (
        <div className="flex flex-col space-y-4">
            <Label htmlFor="time-picker">{label}</Label>
            <div className="flex space-x-2">
                <Select onValueChange={handleHourChange} value={hour}>
                    <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="Ora" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                            <SelectItem key={h} value={h.toString().padStart(2, "0")}>{h.toString().padStart(2, "0")}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={handleMinuteChange} value={minute}>
                    <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                            <SelectItem key={m} value={m.toString().padStart(2, "0")}>{m.toString().padStart(2, "0")}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select onValueChange={handlePeriodChange} value={period}>
                    <SelectTrigger className="w-[70px]">
                        <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
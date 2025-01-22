import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";

interface TimePickerProps {
    label: string;
    initialTime?: string;
    onChange?: (time: string) => void;
}

export function TimePicker({ label, initialTime, onChange }: TimePickerProps) {
    const parseTime = (timeStr: string) => {
        const match = timeStr.match(/(\d{2}):(\d{2})\s*(AM|PM)/i);
        if (match) {
            const [_, h, m, p] = match;
            return { hour: h, minute: m, period: p.toUpperCase() };
        }
        return { hour: "12", minute: "00", period: "AM" };
    };

    const initialParsed = initialTime ? parseTime(initialTime) : { hour: "12", minute: "00", period: "AM" };
    const [hour, setHour] = useState(initialParsed.hour);
    const [minute, setMinute] = useState(initialParsed.minute);
    const [period, setPeriod] = useState(initialParsed.period);

    const handleHourChange = (value: string) => {
        setHour(value.padStart(2, '0'));
        updateTime(value, minute, period);
    };

    const handleMinuteChange = (value: string) => {
        setMinute(value.padStart(2, '0'));
        updateTime(hour, value, period);
    };

    const handlePeriodChange = (value: string) => {
        setPeriod(value);
        updateTime(hour, minute, value);
    };

    const updateTime = (h: string, m: string, p: string) => {
        const formattedTime = `${h.padStart(2, '0')}:${m.padStart(2, '0')} ${p}`;
        onChange?.(formattedTime);
    };

    return (
        <div className="flex flex-col space-y-2">
            <Label>{label}</Label>
            <div className="flex space-x-2">
                <Select value={hour} onValueChange={handleHourChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                            <SelectItem key={h} value={h.toString().padStart(2, "0")}>
                                {h.toString().padStart(2, "0")}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={minute} onValueChange={handleMinuteChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="Minute" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                            <SelectItem key={m} value={m.toString().padStart(2, "0")}>
                                {m.toString().padStart(2, "0")}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={period} onValueChange={handlePeriodChange}>
                    <SelectTrigger>
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
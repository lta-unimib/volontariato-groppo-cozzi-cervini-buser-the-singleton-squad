"use client"

import { DatePickerDialog } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/Button";
import { CityPicker } from "@/components/ui/CityPicker";
import { Textarea } from "@/components/ui/textarea";
import {RoundCheckboxSelector} from "@/components/ui/Checkbox";
import React from "react";

export function VolunteerForm() {
    const handleSaveAction = (date: Date) => {
        console.log("Selected date:", date);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="w-full mx-auto p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="w-full">
                    <DatePickerDialog onSaveAction={handleSaveAction}/>
                </div>
                <div className="w-full">
                    <CityPicker/>
                </div>
                <div className="w-full">
                    <RoundCheckboxSelector/>
                </div>
                <div className="w-full">
                    <Textarea
                        placeholder="Descrizione dell'utente"
                        className="rounded-2xl min-h-[100px]"
                    />
                </div>
                <Button type="submit" className="w-full rounded-full">Submit</Button>
            </form>
        </div>
    );
}

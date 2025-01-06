"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CityPicker } from "@/components/ui/CityPicker";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import React from "react";
import AvailabilityDialog from "@/components/ui/AvailabilityPicker";

export function VolunteerForm() {
    const [availability, setAvailability] = useState(null);
    const [city, setCity] = useState("");
    const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
    const [description, setDescription] = useState("");

    const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);

    const handleSaveAvailability = (data: any) => {
        setAvailability(data);
        setAvailabilityDialogOpen(false);
    };

    const handleCityChange = (selectedCity: string) => {
        setCity(selectedCity);
    };

    const handleCheckboxChange = (selectedValues: string[]) => {
        setCheckboxValues(selectedValues);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            availability,
            city,
            preferences: checkboxValues,
            description,
        };

        console.log("Form Data:", JSON.stringify(formData, null, 2));

        // Puoi inviare i dati ad un'API qui:
        // fetch("/api/submit", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(formData),
        // });
    };

    return (
        <div className="w-full mx-auto p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="w-full">
                    <AvailabilityDialog
                        open={availabilityDialogOpen}
                        onOpenChange={setAvailabilityDialogOpen}
                        onSaveAction={handleSaveAvailability}
                    />
                </div>
                <div className="w-full">
                    <CityPicker onChange={handleCityChange} />
                </div>
                <div className="w-full">
                    <RoundCheckboxSelector onChange={handleCheckboxChange} />
                </div>
                <div className="w-full">
                    <Textarea
                        placeholder="Descrizione dell'utente"
                        className="rounded-2xl min-h-[100px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </div>
    );
}
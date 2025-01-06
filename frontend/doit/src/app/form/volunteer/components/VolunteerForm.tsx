"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CityPicker } from "@/components/ui/CityPicker";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import React from "react";
import AvailabilityDialog, { AvailabilityData as DialogAvailabilityData } from "@/components/ui/AvailabilityPicker";

// Use the imported type for the form data
interface FormData {
    availability: DialogAvailabilityData | null;
    city: string;
    preferences: string[];
    description: string;
}

export function VolunteerForm() {
    const [availability, setAvailability] = useState<DialogAvailabilityData | null>(null);
    const [city, setCity] = useState("");
    const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);

    const handleSaveAvailability = (data: DialogAvailabilityData) => {
        setAvailability(data);
        setAvailabilityDialogOpen(false);
    };

    const handleCityChange = (selectedCity: string) => {
        setCity(selectedCity);
    };

    const handleCheckboxChange = (selectedValues: string[]) => {
        setCheckboxValues(selectedValues);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData: FormData = {
            availability,
            city,
            preferences: checkboxValues,
            description,
        };

        console.log("Form Data:", JSON.stringify(formData, null, 2));

        try {
            // Uncomment and modify this section when ready to submit to an API
            // const response = await fetch("/api/submit", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(formData),
            // });
            //
            // if (!response.ok) {
            //     throw new Error('Failed to submit form');
            // }
            //
            // const result = await response.json();
            // console.log('Success:', result);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
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
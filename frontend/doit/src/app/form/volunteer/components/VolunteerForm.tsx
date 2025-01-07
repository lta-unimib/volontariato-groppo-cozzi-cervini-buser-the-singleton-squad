"use client";

import { useState } from "react";
import { CityPicker } from "@/components/ui/CityPicker";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import React from "react";
import AvailabilityDialog from "@/app/form/volunteer/components/AvailabilityPicker";
import {BaseForm} from "@/components/ui/BaseForm";
import {VolunteerFormData} from "@/types/formTypes";

export function VolunteerForm() {
    const [formData, setFormData] = useState<VolunteerFormData>({
        fullName: "",
        availability: null,
        city: "",
        preferences: [],
        description: "",
    });
    const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // API implementation
            console.log("Form Data:", JSON.stringify(formData, null, 2));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isValid = () => {
        return formData.availability !== null &&
            formData.city !== "" &&
            formData.preferences.length > 0 &&
            formData.description.trim().length > 0;
    };

    return (
        <BaseForm onSubmit={handleSubmit} isValid={isValid()}>
            <AvailabilityDialog
                open={availabilityDialogOpen}
                onOpenChange={setAvailabilityDialogOpen}
                onSaveAction={(availability) => setFormData({...formData, availability})}
            />
            <CityPicker
                value={formData.city}
                onChange={(city) => setFormData({...formData, city})}
            />
            <RoundCheckboxSelector
                onChange={(preferences) => setFormData({...formData, preferences})}
            />
            <Textarea
                placeholder="Descrizione dell'utente"
                className="rounded-2xl min-h-[100px]"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
        </BaseForm>
    );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import React from "react";
import {Input} from "@/components/ui/Input";
import {AutocompleteComponent} from "@/components/ui/AutoComplete";

// Use the imported type for the form data
interface FormData {
    organizationName: string;
    preferences: string[];
    description: string;
    VATNumber: string;
    webSite: string;
}

export function OrganizationForm() {
    const [organizationName, setOrganizationName] = useState<string>("");
    const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [VATNumber, setVATNumber] = useState<string>("");
    const [webSite, setWebSite] = useState<string>("");

    const handleOrganizationNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrganizationName(event.target.value);
    };

    const handleCheckboxChange = (selectedValues: string[]) => {
        setCheckboxValues(selectedValues);
    };

    const handleVATNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVATNumber(event.target.value);
    };

    const handleWebSiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWebSite(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData: FormData = {
            organizationName,
            preferences: checkboxValues,
            description,
            VATNumber,
            webSite
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
                    <Input
                        placeholder="Nome Organizazione"
                        className="rounded-3xl"
                        onChange={handleOrganizationNameChange}
                    />
                </div>
                <div className="w-full">
                    <AutocompleteComponent
                    />
                </div>
                <div className="w-full">
                    <RoundCheckboxSelector onChange={handleCheckboxChange}/>
                </div>
                <div className="w-full">
                    <Textarea
                        placeholder="Descrizione dell'organizzazione"
                        className="rounded-2xl min-h-[100px]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <Input
                        placeholder="Partita IVA(opzionale)"
                        className="rounded-3xl"
                        onChange={handleVATNumberChange}
                    />
                </div>
                <div className="w-full">
                    <Input
                        placeholder="Sito Web(opzionale)"
                        className="rounded-3xl"
                        onChange={handleWebSiteChange}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={
                        ((organizationName.length === 0) ||
                            (checkboxValues.length === 0) ||
                            (description === "") ||
                            (description.length === 0) ||
                            (description.trim().length === 0))
                    }>
                    Submit
                </Button>
            </form>
        </div>
    );
}
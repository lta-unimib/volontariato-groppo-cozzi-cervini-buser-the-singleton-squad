"use client";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { AutocompleteComponent } from "@/components/ui/AutoComplete";

interface FormData {
    organizationName: string;
    address: string[];
    preferences: string[];
    description: string;
    VATNumber: string;
    webSite: string;
}

export function OrganizationForm() {
    const [formState, setFormState] = useState<FormData>({
        organizationName: "",
        address: [],
        preferences: [],
        description: "",
        VATNumber: "",
        webSite: "",
    });
    const [error, setError] = useState<string | null>(null);

    // Memoized handlers using useCallback
    const handleOrganizationNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({ ...prev, organizationName: event.target.value }));
    }, []);

    const handleAddressChange = useCallback((selectedValues: string[]) => {
        setFormState(prev => ({ ...prev, address: selectedValues }));
    }, []);

    const handleCheckboxChange = useCallback((selectedValues: string[]) => {
        setFormState(prev => ({ ...prev, preferences: selectedValues }));
    }, []);

    const handleDescriptionChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormState(prev => ({ ...prev, description: event.target.value }));
    }, []);

    const handleVATNumberChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({ ...prev, VATNumber: event.target.value }));
    }, []);

    const handleWebSiteChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({ ...prev, webSite: event.target.value }));
    }, []);

    // Validation functions
    const validateVATNumber = (vat: string) => {
        const vatRegex = /^[A-Za-z0-9]+$/;
        return vatRegex.test(vat);
    };

    const validateWebSite = (website: string) => {
        const websiteRegex = /^(https?|chrome):\/\/[^\s$.?#].\S*$/;
        return websiteRegex.test(website);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation checks
        if (formState.VATNumber && !validateVATNumber(formState.VATNumber)) {
            setError("Invalid VAT Number format.");
            return;
        }
        if (formState.webSite && !validateWebSite(formState.webSite)) {
            setError("Invalid website URL format.");
            return;
        }

        try {
            console.log("Form Data:", JSON.stringify(formState, null, 2));
            // API submission code here when needed
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Error submitting the form. Please try again later.');
        }
    };

    return (
        <div className="w-full mx-auto p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="text-red-500">{error}</div>}

                <div className="w-full">
                    <Input
                        placeholder="Nome Organizzazione"
                        className="rounded-3xl"
                        onChange={handleOrganizationNameChange}
                        value={formState.organizationName}
                    />
                </div>
                <div className="w-full">
                    <AutocompleteComponent
                        onChange={handleAddressChange}
                        key="address-autocomplete" // Add a stable key
                    />
                </div>
                <div className="w-full">
                    <RoundCheckboxSelector onChange={handleCheckboxChange} />
                </div>
                <div className="w-full">
                    <Textarea
                        placeholder="Descrizione dell'organizzazione"
                        className="rounded-2xl min-h-[100px]"
                        value={formState.description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className="w-full">
                    <Input
                        placeholder="Partita IVA (opzionale)"
                        className="rounded-3xl"
                        onChange={handleVATNumberChange}
                        value={formState.VATNumber}
                    />
                </div>
                <div className="w-full">
                    <Input
                        placeholder="Sito Web (opzionale)"
                        className="rounded-3xl"
                        onChange={handleWebSiteChange}
                        value={formState.webSite}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={
                        !formState.organizationName ||
                        !formState.address.length ||
                        formState.preferences.length === 0 ||
                        formState.description.trim().length === 0
                    }
                >
                    Submit
                </Button>
            </form>
        </div>
    );
}
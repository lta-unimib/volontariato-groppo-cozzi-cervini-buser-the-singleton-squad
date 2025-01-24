import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/core/Textarea";
import { Checkbox } from "@/components/core/Checkbox";
import { BaseForm } from "@/components/form/BaseForm";
import { DatePickerDialog } from "@/components/form/availability/DatePicker";
import AddressForm from "@/components/form/city/AddressForm";
import { Input } from "@/components/core/Input";
import { TimePicker } from "@/components/form/availability/TimePicker";
import { Card, CardContent } from "@/components/core/Card";
import { useFormSubmission } from "@/hooks/form/useFormSubmission";
import { useFormInitialization } from "@/hooks/form/useFormInitialization";
import { useRequestFormValidation } from "@/hooks/form/validator/useRequestFormValidator";
import { RequestFormData } from "@/types/form/request/requestFormData";
import { useFormData } from "@/hooks/form/useFormData";
import { useFormFocus } from "@/hooks/form/useFormFocus";

/**
 * Component for managing a request form. It allows users to enter details such as the title, date range, address, categories, description, and volunteer capacity.
 * This form can be used to create or edit requests based on the data passed through the URL or an initial form state.
 *
 * @returns - The rendered form component.
 */
export function RequestForm() {
    const initialFormData: RequestFormData = {
        title: "",
        timeRange: ["", ""],
        address: {
            street: "",
            number: "",
            city: "",
            postalCode: "",
            additionalInfo: ""
        },
        categories: [],
        description: "",
        volunteerCapacity: "",
        startTime: "",
        endTime: ""
    };

    const { formData, updateField, setFormData } = useFormData<RequestFormData>(initialFormData);
    console.log("Initial FormData:", formData);

    const { validationState, isValid } = useRequestFormValidation(formData);
    const { focusState, handleFocus, handleBlur } = useFormFocus();

    const [idRequest, setIdRequest] = useState<string | undefined>(undefined);

    /**
     * Handles extracting query parameters from the URL and sets the request ID if available.
     */
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');
        console.log("Parametro 'data':", data);

        if (data) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(data));
                const id = parsedData.id;
                setIdRequest(id);
                console.log("ID Request Set:", id);
            } catch (error) {
                console.error("Errore durante il parsing dei dati:", error);
            }
        } else {
            console.log("Parametro 'data' non trovato nella query string.");
        }
    }, []);

    const {
        isEditing,
        initialDataLoaded,
        handleSubmit
    } = useFormInitialization({
        setFormDataAction: setFormData,
        formData
    });

    const { handleSubmit: handleSubmitFn } = useFormSubmission("request", undefined, true, idRequest);

    /**
     * Updates the time range in the form data.
     *
     * @param {Date} fromDate - The start date of the range.
     * @param {Date} toDate - The end date of the range.
     */
    const handleDateRangeUpdate = (fromDate: Date, toDate: Date) => {
        const fromDateStr = fromDate.toISOString().split('T')[0];
        const toDateStr = toDate.toISOString().split('T')[0];
        updateField("timeRange", [fromDateStr, toDateStr] as [string, string]);
        console.log("TimeRange Updated:", [fromDateStr, toDateStr]);  // Debug: Date range aggiornato
    };

    if (!initialDataLoaded && isEditing) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center px-4">
            <BaseForm
                onSubmitAction={async (e) => {
                    console.log("Submit invocato", e);
                    const response = await handleSubmit(e, handleSubmitFn);
                    console.log("Risultato di handleSubmit:", response);  // Usa la risposta per il logging
                    return { success: true, message: 'Form submitted successfully!' };
                }}
                isValid={isValid()}
                redirectTo={isEditing ? "../../../dashboard/organization" : "../../../dashboard/organization"}
            >
                <div className="flex flex-col w-full space-y-4">
                    <Input
                        placeholder="Titolo"
                        className="rounded-full"
                        value={isEditing ? formData.title : undefined}
                        onChange={(e) => {
                            updateField("title", e.target.value);
                        }}
                    />

                    <DatePickerDialog
                        onSaveAction={handleDateRangeUpdate}
                        initialDates={isEditing ? formData.timeRange : undefined}
                    />

                    <Card className="rounded-2xl">
                        <CardContent className="flex items-center justify-center h-full">
                            <div className="flex flex-col sm:flex-row sm:space-x-10 sm:justify-center space-y-6 md:space-y-0 pt-6 pb-2 md:pb-4">
                                <TimePicker
                                    label="Seleziona inizio"
                                    onChange={(time) => {
                                        updateField("startTime", time);
                                    }}
                                    initialTime={isEditing ? formData.startTime : undefined}
                                />

                                <TimePicker
                                    label="Seleziona fine"
                                    onChange={(time) => {
                                        updateField("endTime", time);
                                    }}
                                    initialTime={isEditing ? formData.endTime : undefined}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <AddressForm
                        onSaveAction={(address) => {
                            console.log("Indirizzo cambiato:", address);
                            updateField("address", {
                                ...address,
                                additionalInfo: address.additionalInfo || ""
                            });
                        }}
                        initialAddress={isEditing ? formData.address : undefined}
                    />

                    <Checkbox
                        onChangeAction={(categories) => {
                            console.log("Categorie cambiate:", categories);
                            updateField("categories", categories);
                        }}
                        initialSelected={isEditing ? formData.categories : []}
                    />

                    <Textarea
                        placeholder="Descrizione della richiesta di volontariato"
                        className="rounded-2xl min-h-[100px]"
                        value={isEditing ? formData.description : undefined}
                        onChange={(e) => {
                            updateField("description", e.target.value);
                        }}
                    />

                    <Input
                        placeholder="Capacità massima di volontari"
                        className="rounded-full"
                        value={isEditing ? formData.volunteerCapacity : undefined}
                        onChange={(e) => {
                            updateField("volunteerCapacity", e.target.value);
                        }}
                        isInvalid={!validationState.isCapacityValid}
                        isFocused={focusState.volunteerCapacityFocused}
                        onFocus={() => handleFocus("volunteerCapacity")}
                        onBlur={() => handleBlur("volunteerCapacity")}
                    />
                </div>
            </BaseForm>
        </div>
    );
}
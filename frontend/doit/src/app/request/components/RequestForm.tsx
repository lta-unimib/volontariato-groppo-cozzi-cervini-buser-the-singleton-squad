import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { BaseForm } from "@/components/refactored/form/BaseForm";
import { useRequestFormSubmission } from '@/app/request/hooks/useRequestFormSubmission';
import { DatePickerDialog } from "@/app/request/components/DatePicker";
import { useFormData } from "@/app/request/hooks/useFormData";
import AddressDialog from "@/app/request/components/AddressDialog";
import { Input } from "@/components/refactored/Input";
import { useFormValidation } from "@/app/request/hooks/useFormValidation";
import { useFormFocus } from "@/app/request/hooks/useFormFocus";
import { TimePicker } from "@/app/request/components/TimePicker";
import { Card, CardContent } from "@/components/ui/Card";
import { useRequestFormInitialization } from '@/app/request/hooks/useRequestFormInizialization';

export function RequestForm() {
    const [idRequest, setIdRequest] = useState<string | undefined>(undefined);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');

        if (data) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(data));
                const id = parsedData.id;
                setIdRequest(id);
            } catch (error) {
                console.error("Errore durante il parsing dei dati:", error);
            }
        } else {
            console.log("Parametro 'data' non trovato nella query string.");
        }
    }, []);


    const { formData, updateField, setFormData } = useFormData();
    const { validationState, isValid } = useFormValidation(formData);
    const { focusState, handleFocus, handleBlur } = useFormFocus();

    const {
        isEditing,
        initialDataLoaded,
        handleSubmit
    } = useRequestFormInitialization({
        setFormDataAction: setFormData,
        formData
    });

    const { handleSubmit: handleSubmitFn } = useRequestFormSubmission(isEditing, idRequest);

    const handleDateRangeUpdate = (fromDate: Date, toDate: Date) => {
        const fromDateStr = fromDate.toISOString().split('T')[0];
        const toDateStr = toDate.toISOString().split('T')[0];
        updateField("timeRange", [fromDateStr, toDateStr] as [string, string]);
    };

    if (!initialDataLoaded && isEditing) {
        return <div>Loading...</div>;
    }

    return (
        <BaseForm
            onSubmitAction={(e) => handleSubmit(e, handleSubmitFn)}
            isValid={isValid()}
            redirectTo={isEditing ? "../../../dashboard/organization" : "../../../dashboard/organization"}
        >
            <div className="flex flex-col space-y-4">
                <Input
                    placeholder="Titolo"
                    className="rounded-full"
                    value={isEditing ? formData.title : undefined}
                    onChange={(e) => updateField("title", e.target.value)}
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
                                onChange={(time) => updateField("startTime", time)}
                                initialTime={isEditing ? formData.startTime : undefined}
                            />

                            <TimePicker
                                label="Seleziona fine"
                                onChange={(time) => updateField("endTime", time)}
                                initialTime={isEditing ? formData.endTime : undefined}
                            />
                        </div>
                    </CardContent>
                </Card>

                <AddressDialog
                    onSaveAction={(address) => updateField("address", address)}
                    initialAddress={isEditing ? formData.address : undefined}
                />

                <RoundCheckboxSelector
                    onChangeAction={(categories) => updateField("categories", categories)}
                    initialSelected={isEditing ? formData.categories : []}
                />

                <Textarea
                    placeholder="Descrizione della richiesta di volontariato"
                    className="rounded-2xl min-h-[100px]"
                    value={isEditing ? formData.description : undefined}
                    onChange={(e) => updateField("description", e.target.value)}
                />

                <Input
                    placeholder="Capacità massima di volontari"
                    className="rounded-full"
                    value={isEditing ? formData.volunteerCapacity : undefined}
                    onChange={(e) => updateField("volunteerCapacity", e.target.value)}
                    isInvalid={!validationState.isCapacityValid}
                    isFocused={focusState.volunteerCapacityFocused}
                    onFocus={() => handleFocus("volunteerCapacity")}
                    onBlur={() => handleBlur("volunteerCapacity")}
                />
            </div>
        </BaseForm>
    );
}
import React from "react";
import { Textarea } from "@/components/ui/Textarea";
import { RoundCheckboxSelector } from "@/components/ui/Checkbox";
import { BaseForm } from "@/components/ui/form/BaseForm";
import { useRequestFormSubmission } from '@/app/request/hooks/useRequestFormSubmission';
import { DatePickerDialog } from "@/app/request/components/DatePicker";
import { useFormData } from "@/app/request/hooks/useFormData";
import AddressDialog from "@/app/request/components/AddressDialog";
import { Input } from "@/components/ui/Input";
import { useFormValidation } from "@/app/request/hooks/useFormValidation";
import { useFormFocus } from "@/app/request/hooks/useFormFocus";
import { TimePicker } from "@/app/request/components/TimePicker";
import { Card, CardContent } from "@/components/ui/Card";
import { useRequestFormInitialization } from '@/app/request/hooks/useRequestFormInizialization';

export function RequestForm() {
    const { formData, updateField, setFormData } = useFormData();
    const { handleSubmit: handleSubmitFn } = useRequestFormSubmission();
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
                    value={formData.title || ''}
                    onChange={(e) => updateField("title", e.target.value)}
                />

                <DatePickerDialog
                    onSaveAction={handleDateRangeUpdate}
                    initialDates={formData.timeRange}
                />

                <Card className="rounded-2xl">
                    <CardContent className="flex items-center justify-center h-full">
                        <div className="flex flex-col sm:flex-row sm:space-x-10 sm:justify-center space-y-6 md:space-y-0 pt-6 pb-2 md:pb-4">
                            <TimePicker
                                label="Seleziona inizio"
                                onChange={(time) => updateField("startTime", time)}
                                initialTime={formData.startTime}
                            />

                            <TimePicker
                                label="Seleziona fine"
                                onChange={(time) => updateField("endTime", time)}
                                initialTime={formData.endTime}
                            />
                        </div>
                    </CardContent>
                </Card>

                <AddressDialog
                    onSaveAction={(address) => updateField("address", address)}
                    initialAddress={formData.address}
                />

                <RoundCheckboxSelector
                    onChangeAction={(categories) => updateField("categories", categories)}
                    initialSelected={formData.categories}
                    key={JSON.stringify(formData.categories)}
                />

                <Textarea
                    placeholder="Descrizione della richiesta di volontariato"
                    className="rounded-2xl min-h-[100px]"
                    value={formData.description || ''}
                    onChange={(e) => updateField("description", e.target.value)}
                />

                <Input
                    placeholder="Capacità massima di volontari"
                    className="rounded-full"
                    value={formData.volunteerCapacity || ''}
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
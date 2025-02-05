"use client";

import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/core/Dialog";
import { Button } from "@/components/core/Button";
import { Input } from "@/components/core/Input";
import { MdOutlineHome } from "react-icons/md";
import { cn } from "@/utils/cnUtils";
import { AddressFormData } from '@/types/form/city/addressFormData';
import { useFormData } from "@/hooks/form/useFormData";
import { useFormFocus } from "@/hooks/form/useFormFocus";
import { useAddressFormValidator } from '@/hooks/form/validator/useAddressFormValidator';
import { CityForm } from '@/components/form/city/CityForm';

interface AddressDialogProps {
    onSaveAction: (data: AddressFormData) => void;
    initialAddress?: AddressFormData;
}

const AddressForm: React.FC<AddressDialogProps> = ({ onSaveAction, initialAddress }) => {
    const [open, setOpen] = React.useState(false);
    const [savedAddress, setSavedAddress] = React.useState<AddressFormData | null>(initialAddress || null);

    const initialAddressData: AddressFormData = {
        street: "",
        number: "",
        city: "",
        postalCode: "",
        additionalInfo: "",
    };

    // Custom hooks to manage form data, focus state, and validation state
    const {
        formData: addressData,
        updateField,
        setFormData: setAddressData,
        resetForm
    } = useFormData<AddressFormData>(initialAddressData);

    const { focusState, handleFocus, handleBlur } = useFormFocus();
    const { validationState, isValid } = useAddressFormValidator(addressData);

    // If an initial address is provided, set it in the form
    useEffect(() => {
        if (initialAddress) {
            setAddressData(initialAddress);
            setSavedAddress(initialAddress);
        }
    }, [initialAddress, setAddressData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateField(name as keyof AddressFormData, value);
    };

    const handleCityChange = (selectedCity: string, selectedCap?: string) => {
        updateField('city', selectedCity);
        if (selectedCap) {
            updateField('postalCode', selectedCap);
        }
    };

    const handleSave = () => {
        if (isValid()) {
            setSavedAddress(addressData);
            onSaveAction(addressData);
            setOpen(false);
        }
    };

    const getDisplayText = () => {
        if (savedAddress && (savedAddress.street || savedAddress.number || savedAddress.city || savedAddress.postalCode || savedAddress.additionalInfo)) {
            let text = `${savedAddress.street || ''} ${savedAddress.number || ''}`.trim();
            if (savedAddress.city) {
                text += `, ${savedAddress.city}`;
            }
            if (savedAddress.postalCode) {
                text += `, ${savedAddress.postalCode}`;
            }
            if (savedAddress.additionalInfo) {
                text += `, ${savedAddress.additionalInfo}`;
            }
            return text;
        }
        return "Inserisci indirizzo";
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal rounded-full",
                        savedAddress ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    <MdOutlineHome className="mr-2 h-5 w-5" />
                    {getDisplayText()}
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[90%] sm:max-w-[425px] w-full p-6 sm:mx-0 rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Inserisci Indirizzo</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <Input
                        id="street"
                        name="street"
                        value={addressData.street}
                        onChange={handleInputChange}
                        className="w-full rounded-full"
                        placeholder="Via"
                        isInvalid={!validationState.isStreetValid}
                        isFocused={focusState.streetFocused}
                        onFocus={() => handleFocus("street")}
                        onBlur={() => handleBlur("street")}
                    />

                    <Input
                        id="number"
                        name="number"
                        value={addressData.number}
                        onChange={handleInputChange}
                        className="w-full rounded-full"
                        placeholder="Numero"
                        isInvalid={!validationState.isNumberValid}
                        isFocused={focusState.numberFocused}
                        onFocus={() => handleFocus("number")}
                        onBlur={() => handleBlur("number")}
                    />

                    <CityForm
                        value={addressData.city}
                        onChangeAction={handleCityChange}
                        showCap={true}
                    />

                    <Input
                        id="postalCode"
                        name="postalCode"
                        value={addressData.postalCode}
                        onChange={handleInputChange}
                        className="w-full rounded-full"
                        placeholder="CAP"
                        isInvalid={!validationState.isPostalCodeValid}
                        isFocused={focusState.postalCodeFocused}
                        onFocus={() => handleFocus("postalCode")}
                        onBlur={() => handleBlur("postalCode")}
                    />

                    <Input
                        id="additionalInfo"
                        name="additionalInfo"
                        value={addressData.additionalInfo ?? ''}
                        onChange={handleInputChange}
                        className="w-full rounded-full"
                        placeholder="Interno/Campanello (opzionale)"
                        isFocused={focusState.additionalInfoFocused}
                        onFocus={() => handleFocus("additionalInfo")}
                        onBlur={() => handleBlur("additionalInfo")}
                    />
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setOpen(false);
                            resetForm();
                        }}
                        className="w-full sm:w-auto rounded-full"
                    >
                        Annulla
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="w-full sm:w-auto rounded-full"
                        disabled={!isValid()}
                    >
                        Salva
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddressForm;

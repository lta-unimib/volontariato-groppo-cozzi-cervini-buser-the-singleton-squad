"use client";

import React, { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/refactored/Input";
import { CityPicker } from '@/components/refactored/form/city/CityPicker';
import { MdOutlineHome } from "react-icons/md";
import { cn } from "@/utils/utils";
import { AddressFormData } from '@/types/refactored/addressFormData';
import { useAddressFormData } from '@/app/request/hooks/useAddressFormData';
import { useAddressFormFocus } from '@/app/request/hooks/useAddressFormFocus';
import { useAddressFormValidation } from '@/app/request/hooks/useAddressFormValidation';

interface AddressDialogProps {
    onSaveAction: (data: AddressFormData) => void;
    initialAddress?: AddressFormData;
}

const AddressDialog: React.FC<AddressDialogProps> = ({ onSaveAction, initialAddress }) => {
    const [open, setOpen] = React.useState(false);
    const [savedAddress, setSavedAddress] = React.useState<AddressFormData | null>(initialAddress || null);
    const { addressData, setAddressData, updateField, resetForm } = useAddressFormData();
    const { focusState, handleFocus, handleBlur } = useAddressFormFocus();
    const { validationState, isValid } = useAddressFormValidation(addressData);

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

                    <CityPicker
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

export default AddressDialog;
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CityPicker } from '../../../components/ui/city/CityPicker';
import { MdHome } from "react-icons/md";
import { cn } from "@/lib/utils";
import { AddressData } from '@/types/addressData';

interface AddressDialogProps {
    onSaveAction: (data: AddressData) => void;
}

const AddressDialog: React.FC<AddressDialogProps> = ({ onSaveAction }) => {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState<AddressData>({
        street: '',
        number: '',
        city: '',
        postalCode: '',
        additionalInfo: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleCityChange = (selectedCity: string, selectedCap?: string) => {
        setAddress(prev => ({
            ...prev,
            city: selectedCity,
            postalCode: selectedCap ?? prev.postalCode
        }));
    };

    const handleSave = () => {
        onSaveAction(address);
        setOpen(false);
    };

    const isFormValid = () => {
        return address.street && address.number && address.city && address.postalCode;
    };

    const getDisplayText = () => {
        if (isFormValid()) {
            let text = `${address.street} ${address.number}, ${address.city}, ${address.postalCode}`;
            if (address.additionalInfo) {
                text += `, ${address.additionalInfo}`;
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
                        isFormValid() ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    <MdHome className="mr-2 h-5 w-5" />
                    {getDisplayText()}
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[90%] sm:max-w-[425px] w-full p-6 sm:mx-0 rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Inserisci Indirizzo</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Input
                            id="street"
                            name="street"
                            value={address.street}
                            onChange={handleInputChange}
                            className="w-full rounded-full"
                            placeholder="Via"
                        />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Input
                            id="number"
                            name="number"
                            value={address.number}
                            onChange={handleInputChange}
                            className="w-full rounded-full"
                            placeholder="Numero"
                        />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4">
                        <CityPicker
                            value={address.city}
                            onChangeAction={handleCityChange}
                            showCap={true}
                        />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Input
                            id="postalCode"
                            name="postalCode"
                            value={address.postalCode}
                            onChange={handleInputChange}
                            className="w-full rounded-full"
                            placeholder="CAP"
                        />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Input
                            id="additionalInfo"
                            name="additionalInfo"
                            value={address.additionalInfo ?? ''}
                            onChange={handleInputChange}
                            className="w-full rounded-full"
                            placeholder="Interno/Campanello (opzionale)"
                        />
                    </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="w-full sm:w-auto rounded-full"
                    >
                        Annulla
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="w-full sm:w-auto rounded-full"
                        disabled={!isFormValid()}
                    >
                        Salva
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddressDialog;
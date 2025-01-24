"use client";
import { Card, CardContent } from "@/components/core/Card";
import { Label } from "@/components/core/Label";
import { ScrollArea } from "@/components/core/ScrollArea";
import { CheckboxProps } from "@/types/props/core/checkboxProps";
import { useState, useId, useCallback } from "react";

/**
 * Checkbox component that allows users to select categories. Supports both single and multi-select functionality.
 *
 * @param {CheckboxProps} props - The properties for the Checkbox component.
 * @param {Function} [props.onChangeAction] - Callback function called when the selected options change.
 * @param {string[]} [props.initialSelected] - Initial selected options.
 * @param {boolean} [props.readOnly=false] - If `true`, the checkbox is in read-only mode and cannot be changed.
 * @param {boolean} [props.isSingleSelect=false] - If `true`, only one option can be selected at a time.
 *
 * @returns JSX.Element The rendered Checkbox component with a list of selectable categories.
 */
export function Checkbox({
                             onChangeAction,
                             initialSelected = [],
                             readOnly = false,
                             isSingleSelect = false,
                         }: CheckboxProps) {
    const categories = [
        { id: "supporto_anziani", label: "Supporto Anziani" },
        { id: "supporto_bambini", label: "Supporto Bambini" },
        { id: "supporto_disabili", label: "Supporto Disabili" },
        { id: "ripetizioni", label: "Ripetizioni" },
        { id: "caritas", label: "Caritas" },
    ];

    const componentId = useId();
    const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelected);

    const handleCheckboxChange = useCallback(
        (optionId: string) => {
            if (readOnly) return;

            let updatedSelected: string[];
            if (isSingleSelect) {
                updatedSelected = selectedOptions[0] === optionId ? [] : [optionId];
            } else {
                updatedSelected = selectedOptions.includes(optionId)
                    ? selectedOptions.filter((id) => id !== optionId)
                    : [...selectedOptions, optionId];
            }

            setSelectedOptions(updatedSelected);
            onChangeAction?.(updatedSelected);
        },
        [selectedOptions, readOnly, isSingleSelect, onChangeAction]
    );

    const generateOptionId = (optionId: string) => `${componentId}-${optionId}`;

    return (
        <Card className="w-full rounded-[24px]">
            <CardContent className="p-4">
                <ScrollArea className="h-28">
                    <div className="space-y-1">
                        {categories.map((option) => {
                            const uniqueOptionId = generateOptionId(option.id);
                            const isSelected = selectedOptions.includes(option.id);

                            return (
                                <div
                                    key={uniqueOptionId}
                                    className={`flex items-center space-x-2 py-2 ${readOnly ? "" : "cursor-pointer"}`}
                                >
                                    <input
                                        type="checkbox"
                                        id={uniqueOptionId}
                                        checked={isSelected}
                                        onChange={() => handleCheckboxChange(option.id)}
                                        className="hidden peer"
                                        disabled={readOnly}
                                        aria-label={option.label}
                                    />
                                    <label
                                        htmlFor={uniqueOptionId}
                                        className={`relative w-4 h-4 rounded-full border ${
                                            readOnly
                                                ? isSelected
                                                    ? "border-primary"
                                                    : "border-gray-200"
                                                : "border-gray-200 hover:border-gray-300"
                                        } transition-colors peer-checked:border-primary flex items-center justify-center`}
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full transition-colors ${
                                                isSelected ? "bg-primary" : "bg-transparent"
                                            }`}
                                        />
                                    </label>
                                    <Label
                                        htmlFor={uniqueOptionId}
                                        className={`${readOnly ? "" : "cursor-pointer"} text-sm font-normal`}
                                    >
                                        {option.label}
                                    </Label>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
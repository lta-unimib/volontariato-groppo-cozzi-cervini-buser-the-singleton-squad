"use client";
import { Card, CardContent } from "@/components/core/Card";
import { Label } from "@/components/core/Label";
import { ScrollArea } from "@/components/core/ScrollArea";
import { CheckboxProps } from "@/types/props/core/checkboxProps";
import { useState, useId, useCallback } from "react";
import { useCategories } from "@/hooks/useCategories";

/**
 * A custom checkbox component that supports single or multiple selections.
 *
 * @param {CheckboxProps} props - The properties for the checkbox component.
 * @param {Function} [props.onChangeAction] - Callback triggered when the selected options change.
 * @param {string[]} [props.initialSelected=[]] - Array of initially selected option IDs.
 * @param {boolean} [props.readOnly=false] - Determines if the component is read-only.
 * @param {boolean} [props.isSingleSelect=false] - Enables single-select mode.
 * @returns The rendered Checkbox component.
 */
export function Checkbox({
                             onChangeAction,
                             initialSelected = [],
                             readOnly = false,
                             isSingleSelect = false,
                         }: CheckboxProps) {
    const { categories } = useCategories();
    const componentId = useId();
    const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelected);

    /**
     * Handles the change of a checkbox selection.
     *
     * @param {string} optionId - The ID of the option being toggled.
     */
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

    /**
     * Generates a unique ID for an option to ensure it doesn't conflict.
     *
     * @param {string} optionId - The original ID of the option.
     * @returns A unique ID string.
     */
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
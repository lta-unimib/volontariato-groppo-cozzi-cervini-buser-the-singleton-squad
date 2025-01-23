"use client"

import { cn } from "@/utils/cnUtils"
import { Button } from "@/components/ui/Button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card"
import { Input } from "@/components/refactored/Input"
import { Label } from "@/components/ui/Label"
import Link from "next/link"
import { BaseForm } from "@/components/refactored/form/BaseForm"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import React, { useState } from "react"
import { SuccessResponse } from "@/types/refactored/form/baseFormData"
import { useFormSubmission } from "@/hooks/refactored/form/useFormSubmission"
import { LoginFormProps } from "@/types/refactored/form/auth/loginFormData"

export function LoginForm({
                              className,
                              role
                          }: LoginFormProps): React.ReactElement {
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        showPassword: false
    });

    const redirectPath = role === "volunteer"
        ? "/dashboard/volunteer"
        : "/dashboard/organization";

    const signUpHref = role === "volunteer"
        ? "/signup/volunteer/"
        : "/signup/organization/";

    const { handleSubmit: loginSubmit } = useFormSubmission("login", role);

    const updateFormState = (field: string, value: string | boolean) => {
        setFormState(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (): Promise<SuccessResponse> => {
        try {
            const { email, password } = formState;
            const response = await loginSubmit({ email, password });

            if (response.status === 200) {
                return {
                    success: true,
                    redirectUrl: redirectPath
                };
            }

            return {
                success: false,
                message: "Login fallito"
            };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Login fallito"
            };
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Accesso</CardTitle>
                    <CardDescription>
                        Inserisci la tua email per accedere al tuo account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BaseForm
                        onSubmitAction={handleSubmit}
                        isValid={!!formState.email && !!formState.password}
                        submitText="Accedi"
                        className="p-0"
                        buttonClassName="w-full"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="esempio@gmail.com"
                                    required
                                    value={formState.email}
                                    onChange={(e) => updateFormState('email', e.target.value)}
                                    className="rounded-full pl-4"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={formState.showPassword ? "text" : "password"}
                                        placeholder="Password123?"
                                        required
                                        value={formState.password}
                                        onChange={(e) => updateFormState('password', e.target.value)}
                                        className="rounded-full pl-4"
                                    />
                                    <Button
                                        variant="ghost"
                                        type="button"
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2"
                                        onClick={() => updateFormState('showPassword', !formState.showPassword)}
                                    >
                                        {formState.showPassword ? (
                                            <AiOutlineEyeInvisible size={20} className="text-muted-foreground"/>
                                        ) : (
                                            <AiOutlineEye size={20} className="text-muted-foreground"/>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 text-center text-sm">
                            Non hai un account?{" "}
                            <Link href={signUpHref} className="underline underline-offset-4">
                                Registrati
                            </Link>
                        </div>
                    </BaseForm>
                </CardContent>
            </Card>
        </div>
    )
}
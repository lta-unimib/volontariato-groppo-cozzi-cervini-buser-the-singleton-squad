"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import Link from "next/link"
import { BaseForm } from "@/components/ui/form/BaseForm"
import { useLoginForm } from "@/hooks/refactored/login/useLoginForm"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import React, {useState} from "react"
import { SuccessResponse } from "@/types/refactored/baseForm"
import { LoginTypes } from "@/types/refactored/login/loginTypes"


/**
 * Login form component with email and password inputs.
 *
 * This component renders a login form with email and password fields, as well as a link to the sign-up page.
 * It also provides functionality for toggling password visibility.
 * @param {string} [className] - Optional additional CSS classes to be applied to the wrapper div.
 * @param signUpHref
 * @param loginApiLink
 * @param redirectPath
 * @param props
 * @returns {React.ReactElement} - The rendered login form.
 */

export function LoginForm({
                              className,
                              signUpHref = "#",
                              loginApiLink = "#",
                              redirectPath = "#",
                              ...props
                          }: LoginTypes): React.ReactElement {
    const { formState, updateFormState, handleSubmit: loginSubmit } = useLoginForm({
        loginApiLink,
        redirectPath,
    });

    const [redirecting, setRedirecting] = useState(false);

    const handleSubmit = async (e: React.FormEvent): Promise<SuccessResponse> => {
        try {
            await loginSubmit(e);
            setRedirecting(true);
            return { success: true, redirectUrl: redirectPath };
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message : "Login fallito"
            };
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
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
                    {redirecting && (
                        <Link href={redirectPath} className="hidden" />
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
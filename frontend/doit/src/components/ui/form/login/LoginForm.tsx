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
import { useLoginForm } from "@/hooks/useLoginForm"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import React from "react";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
    signUpHref?: string
    loginApiLink?: string
    redirectPath?: string
}

export function LoginForm({
                              className,
                              signUpHref = "#",
                              loginApiLink = "#",
                              redirectPath = "#",
                              ...props
                          }: LoginFormProps) {
    const { formState, updateFormState, handleSubmit } = useLoginForm({
        loginApiLink,
        redirectPath,
    })

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
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
                                        required
                                        value={formState.password}
                                        onChange={(e) => updateFormState('password', e.target.value)}
                                        className="rounded-full pl-4"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                                        onClick={() => updateFormState('showPassword', !formState.showPassword)}
                                    >
                                        {formState.showPassword ? (
                                            <AiOutlineEyeInvisible size={20} className="text-muted-foreground"/>
                                        ) : (
                                            <AiOutlineEye size={20} className="text-muted-foreground"/>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <Button type="submit" className="w-full" disabled={formState.loading}>
                                {formState.loading ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                        {formState.error && (
                            <div className="mt-4 text-destructive text-center">
                                {formState.error}
                            </div>
                        )}
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href={signUpHref} className="underline underline-offset-4">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
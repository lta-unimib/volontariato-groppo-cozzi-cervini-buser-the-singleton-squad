import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { API_BASE_LINK } from "@/utils/constants"

interface LoginFormState {
    readonly email: string
    readonly password: string
    readonly showPassword: boolean
    readonly error: string | null
    readonly loading: boolean
}

interface UseLoginFormProps {
    readonly loginApiLink: string
    readonly redirectPath: string
}

export const useLoginForm = ({ loginApiLink, redirectPath }: UseLoginFormProps) => {
    const [formState, setFormState] = useState<LoginFormState>({
        email: "",
        password: "",
        showPassword: false,
        error: null,
        loading: false,
    })

    const router = useRouter()

    const updateFormState = (field: keyof LoginFormState, value: any) => {
        setFormState(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        updateFormState('loading', true)
        updateFormState('error', null)

        try {
            const fullUrl = `${API_BASE_LINK}${loginApiLink}`
            const response = await fetch(fullUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formState.email,
                    password: formState.password
                }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                const errorMessage = errorData.message || `Login failed: ${response.statusText}`
                updateFormState('error', errorMessage)
                return
            }

            const data = await response.json()
            console.log(data)
            router.push(redirectPath)

        } catch (err) {
            updateFormState('error', "An unexpected error occurred. Please try again later.")
        } finally {
            updateFormState('loading', false)
        }
    }

    return {
        formState,
        updateFormState,
        handleSubmit,
    }
}
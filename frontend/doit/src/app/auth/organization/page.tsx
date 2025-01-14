import { LoginForm } from "@/components/ui/LoginForm"

export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm signUpHref="/form/organization" loginApiLink="/login/organization/" redirectPath="dashboard/organization" />
            </div>
        </div>
    )
}
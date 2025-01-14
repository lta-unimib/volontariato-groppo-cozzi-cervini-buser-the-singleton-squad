import { LoginForm } from "@/components/ui/form/login/LoginForm"

export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm signUpHref="/form/volunteer/" loginApiLink="/login/volunteer/" redirectPath="/dashboard/volunteer"/>
            </div>
        </div>
    )
}
import { LoginForm } from "@/components/form/auth/LoginForm"

/**
 * `OrganizationLogin` Component.
 *
 * This login page is intended for users with the "organization" role.
 * It displays a login form centered both horizontally and vertically.
 * The `LoginForm` component receives a `role` prop to identify the user type (in this case, an organization).
 *
 * @returns The login page component for organizations.
 */
export default function OrganizationLogin() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm role="organization" />
            </div>
        </div>
    )
}
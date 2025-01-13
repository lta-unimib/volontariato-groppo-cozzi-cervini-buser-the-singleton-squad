import { Page } from '@/components/layout/Page';
import {OrganizationForm} from "@/app/form/organization/components/OrganizationForm";

export default function Home() {
    return (
        <Page>
            <OrganizationForm />
        </Page>
    );
}
import { Page } from '@/components/layout/Page';
import {Header} from "@/components/layout/Header";
import {OrganizationForm} from "@/app/form/organization/components/OrganizationForm";

export default function Home() {
    return (
        <Page>
            <Header />
            <OrganizationForm />
        </Page>
    );
}
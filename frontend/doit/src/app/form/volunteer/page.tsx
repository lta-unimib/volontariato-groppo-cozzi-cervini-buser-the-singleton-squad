import { Page } from '@/components/layout/Page';
import {VolunteerForm} from "@/app/form/volunteer/components/VolunteerForm";
import {Header} from "@/components/layout/Header";

export default function Home() {
    return (
        <Page>
            <Header />
            <VolunteerForm />
        </Page>
    );
}
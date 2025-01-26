import { Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./core/Card"
import { Button } from "./core/Button"
import {useParticipants} from "@/hooks/usePartecipants";
import React from "react";

interface EmailListProps {
    idRequest: string;
}

export const EmailList: React.FC<EmailListProps> = ({ idRequest }) => {
    const { participants, loading, error } = useParticipants(idRequest)

    const sendEmailToAll = () => {
        const emails = participants.map((p) => p.email).join(",")
        window.location.href = `mailto:?bcc=${emails}`
    }

    if (loading) {
        return (
            <Card className="w-full rounded-2xl shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2 pb-6">
                    <CardTitle>Partecipanti all'evento</CardTitle>
                    <Button disabled className="rounded-full pt-4">
                        Invia Email a Tutti
                    </Button>
                </CardHeader>
                <CardContent>
                    <p>Caricamento in corso...</p>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return (
            <Card className="w-full rounded-2xl shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2 pb-6">
                    <CardTitle>Partecipanti all'evento</CardTitle>
                    <Button disabled className="rounded-full">
                        Invia Email a Tutti
                    </Button>
                </CardHeader>
                <CardContent>
                    <p className="text-destructive">Si è verificato un errore: {error}</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full rounded-2xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-2 pb-6">
                <CardTitle>Partecipanti all'evento</CardTitle>
                <Button onClick={sendEmailToAll} disabled={participants.length === 0} className="rounded-full">
                    Invia Email a Tutti
                </Button>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {participants.map((participant) => (
                        <li key={participant.id} className="bg-gray-100 py-2 px-4 rounded-full flex items-center">
                            <Mail className="w-5 h-5 mr-2 text-gray-500" />
                            <span>{participant.email}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
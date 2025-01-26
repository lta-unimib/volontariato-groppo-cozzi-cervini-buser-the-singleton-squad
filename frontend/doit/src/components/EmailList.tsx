import { Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./core/Card"
import { Button } from "./core/Button"
import { ScrollArea } from "./core/ScrollArea"
import { useParticipants } from "@/hooks/usePartecipants"
import React from "react"
import { Skeleton } from "./sidebar/Skeleton"

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
                    <Skeleton className="h-10 w-24 rounded-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-10 w-full" />
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
                <Button
                    onClick={sendEmailToAll}
                    disabled={participants.length === 0}
                    className="rounded-full"
                >
                    Invia Email a Tutti
                </Button>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[100px] w-full">
                    <ul className="space-y-1 pr-4">
                        {participants.map((participant) => (
                            <li
                                key={participant.id}
                                className="py-2 pl-4 rounded-lg flex items-center hover:bg-secondary/50 transition-colors"
                            >
                                <a
                                    href={`mailto:${participant.email}`}
                                    className="flex items-center w-full"
                                >
                                    <Mail className="w-5 h-5 mr-2 text-foreground" />
                                    <span>{participant.email}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
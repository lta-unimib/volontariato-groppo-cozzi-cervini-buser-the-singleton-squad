"use client";

import { Button } from "@/components/ui/Button";
import { MdOutlineEdit, MdOutlineCheck, MdOutlineBookmarkBorder, MdOutlineDelete } from "react-icons/md";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { RequestFormData } from "@/types/formData";
import { ArrowLeft } from "lucide-react";
import {makeDeleteRequest, makePostRequest} from "@/utils/apiUtils";
import {useEffect, useState} from "react";

interface RequestHeaderProps {
    title: string;
    organizationName: string;
    address: string;
    imageUrl: string;
    categories?: string[];
    requestData: RequestFormData;
    role?: 'organization' | 'volunteer';
}
//TODO ADD WAY TO KNOW IF VOLUNTEER IS ALREADY SUBSCRIBED TO A REQUEST
export const RequestHeader = ({
                                  title,
                                  organizationName,
                                  address,
                                  imageUrl,
                                  requestData,
                                  role
                              }: RequestHeaderProps) => {
    const router = useRouter();

    const [idRequest, setIdRequest] = useState<string | undefined>(undefined);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');

        if (data) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(data));
                const id = parsedData.id;
                setIdRequest(id);
            } catch (error) {
                console.error("Errore durante il parsing dei dati:", error);
            }
        } else {
            console.log("Parametro 'data' non trovato nella query string.");
        }
    }, []);

    const handleSubscribe = async () => {
        const endpoint = "/offer/new";
        await makePostRequest (endpoint, idRequest);
        //TODO CHANGE BUTTON PARTECIPA
    };

    const handleSave = async () => {
        console.log("Profilo salvato");
        const endpoint = "/volunteer/favorite/organization"
        await makePostRequest(endpoint, organizationName);
        //TODO CHANGE BUTTON SALVA ORGANIZZAZIONE
    };

    const handleDelete = async () => {
        const endpoint = `/request/${idRequest}/`;
        await makeDeleteRequest(endpoint);
        router.back();//TODO VERIFICA SE ENDPOINT CORRETTO
    };

    const handleEdit = () => {
        const encodedData = encodeURIComponent(JSON.stringify(requestData));
        router.push(`/request/?mode=edit&data=${encodedData}`);
    };

    const onBack = () => router.back();

    return (
        <div className="w-full">
            <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center text-foreground w-fit [&_svg]:!size-6 p-0 hover:bg-transparent mt-8 mb-4 md:hidden"
            >
                <ArrowLeft />
            </Button>
            <div className="relative w-full h-48 mb-6">
                <Image
                    src={imageUrl}
                    alt="Cover image"
                    className="w-full h-full object-cover rounded-2xl"
                    fill
                    priority
                />
            </div>

            <div className="flex items-start justify-between w-full md:flex-row flex-col">
                <div>
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <p className="text-lg text-muted-foreground">{organizationName}</p>
                    <p className="text-sm text-muted-foreground">{address}</p>
                </div>
                {role && (
                    <div className="flex gap-2">
                        {role === 'volunteer' && (
                            <>
                                <Button
                                    variant="secondary"
                                    size="default"
                                    onClick={handleSave}
                                    className="mt-4 md:mt-0"
                                >
                                    <MdOutlineBookmarkBorder className="mr-2" /> Salva Organizzazione
                                </Button>
                                <Button
                                    variant="default"
                                    size="default"
                                    onClick={handleSubscribe}
                                    className="mt-4 md:mt-0"
                                >
                                    <MdOutlineCheck className="mr-2" /> Partecipa
                                </Button>
                            </>
                        )}
                        {role === 'organization' && (
                            <>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={handleDelete}
                                >
                                    <MdOutlineDelete />
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="default"
                                    onClick={handleEdit}
                                    className="mt-4 md:mt-0"
                                >
                                    <MdOutlineEdit className="mr-2" /> Modifica
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

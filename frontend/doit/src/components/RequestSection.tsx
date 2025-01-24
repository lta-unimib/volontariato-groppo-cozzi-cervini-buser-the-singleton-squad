import React from 'react';
import RequestCard from '@/components/card/RequestCard';
import { formatDateRange } from '@/utils/components/dateUtils';
import {RequestSectionProps} from "@/types/props/requestSectionProps";

export const RequestSection: React.FC<RequestSectionProps> = ({
                                                                  title,
                                                                  requests,
                                                                  role = 'volunteer'
                                                              }) => (
    <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 px-2">{title}</h2>
        <div className="space-y-4">
            {requests.map((request) => (
                <RequestCard
                    key={request.id}
                    organization={request.organization.name}
                    title={request.title}
                    location={`${request.address.street}, ${request.address.city}`}
                    date={formatDateRange(request.timeRange)}
                    image="/placeholder.jpg"
                    role={role}
                    requestData={request}
                />
            ))}
        </div>
    </div>
);
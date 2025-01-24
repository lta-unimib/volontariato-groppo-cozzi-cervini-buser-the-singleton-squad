import React from 'react';
import RequestCard from '@/components/card/RequestCard';
import { formatDateRange } from '@/utils/components/dateUtils';
import {RequestSectionProps} from "@/types/props/requestSectionProps";

/**
 * `RequestSection` is a component that renders a section displaying a list of requests with details such as title, organization, location, date, and role.
 * It is used to display a section of requests, which can be filtered based on the user's role.
 *
 * @param props - The component props.
 * @param title - The title of the request section.
 * @param requests - The list of requests to display in the section.
 * @param role='volunteer' - The user's role, which determines the context in which the requests are displayed (default is 'volunteer').
 * @returns The rendered request section with a list of requests.
 */
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
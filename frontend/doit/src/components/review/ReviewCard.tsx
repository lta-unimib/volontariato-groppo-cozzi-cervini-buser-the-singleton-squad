import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "../core/Card";
import { Skeleton } from "../sidebar/Skeleton";
import React from "react";
import { useReviews } from "@/hooks/useReview";

interface ReviewCardProps {
    type: "volunteer" | "organization" | "request";
    idRequest?: string;
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-5 w-5 ${star <= rating ? "text-primary fill-current" : "text-secondary"}`}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
}

export function ReviewCard({ type, idRequest }: ReviewCardProps) {
    const { reviewData, loading, error } = useReviews(type, idRequest);
    console.log("REVIEWDATA: "+ reviewData + "idRequest: "+ idRequest);

    if (error) {
        return (
            <Card className="w-full">
                <CardContent className="pt-6">
                    <p className="text-center text-destructive">Error: {error}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-xl font-semibold text-foreground">
                    Valutazione {type === "volunteer" ? "volontario" : type === "organization" ? "organizzazione" : "richiesta"}
                </h3>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div
                                className="text-3xl font-bold"
                                aria-label={`Valutazione media`}
                            >
                                {reviewData?.averageRating ? reviewData.averageRating : '0.0'}
                            </div>
                            <StarRating rating={Math.round(reviewData?.averageRating || 0)} />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Basato su {reviewData?.totalReviews || 0} recensioni
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
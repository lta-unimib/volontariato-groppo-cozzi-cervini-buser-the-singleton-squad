"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/core/Button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/core/Dialog"

interface AdaptiveReviewDialogProps {
    type: "volunteer" | "request"
    volunteerName?: string
    requestName?: string
    buttonText?: string
    onSubmit: (rating: number) => void
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

const ReviewDialog = ({
                          type,
                          volunteerName,
                          requestName,
                          buttonText,
                          onSubmit,
                          isOpen,
                          onOpenChange,
                      }: AdaptiveReviewDialogProps) => {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)

    const handleSubmit = () => {
        onSubmit(rating)
        onOpenChange(false)
        setRating(0)
    }

    const handleCancel = () => {
        onOpenChange(false)
        setRating(0)
    }

    const title = type === "volunteer"
        ? `Valuta ${volunteerName}`
        : `Valuta la richiesta "${requestName}"`

    const description =
        type === "volunteer"
            ? "Quanto sei soddisfatto dell'aiuto ricevuto da questo volontario? La tua valutazione ci aiuta ad informare le altre organizzazioni."
            : "Quanto sei soddisfatto di come è stato gestito questo evento? La tua valutazione aiuta le organizzazioni a migliorare il servizio."

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {buttonText && (
                <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-full">
                        {buttonText}
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="pb-4 text-xl">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="flex justify-center py-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`w-8 h-8 cursor-pointer transition-colors ${
                                star <= (hoveredRating || rating) ? "text-primary fill-current" : "text-secondary"
                            }`}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>
                <DialogFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleCancel} className="rounded-full">
                        Annulla
                    </Button>
                    <Button onClick={handleSubmit} disabled={rating === 0} className="rounded-full">
                        Invia valutazione
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewDialog
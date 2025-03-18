"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface RatingModalProps {
  animationId: string
  animationTitle: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (rating: number) => void
}

export default function RatingModal({ animationId, animationTitle, isOpen, onClose, onSubmit }: RatingModalProps) {
  const [rating, setRating] = useState(7)
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  const handleRatingChange = (value: number[]) => {
    setRating(value[0])
  }

  const handleSubmit = () => {
    onSubmit(rating)
    onClose()
  }

  const getRatingLabel = (value: number) => {
    if (value <= 2) return "Poor"
    if (value <= 4) return "Below Average"
    if (value <= 6) return "Average"
    if (value <= 8) return "Good"
    return "Excellent"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate this animation</DialogTitle>
          <DialogDescription>How would you rate "{animationTitle}"?</DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="mb-8 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center">
              {[1, 2, 3, 4, 5].map((star) => {
                const value = star * 2
                const filled = hoveredRating !== null ? hoveredRating >= value : rating >= value
                const halfFilled = hoveredRating !== null ? false : rating >= value - 1 && rating < value

                return (
                  <div
                    key={star}
                    className="relative cursor-pointer p-1"
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(null)}
                    onClick={() => setRating(value)}
                  >
                    <Star
                      className={cn(
                        "h-8 w-8 transition-colors",
                        filled
                          ? "fill-yellow-400 text-yellow-400"
                          : halfFilled
                            ? "fill-yellow-400/50 text-yellow-400"
                            : "text-muted-foreground",
                      )}
                    />
                  </div>
                )
              })}
            </div>

            <div className="text-center">
              <span className="text-lg font-medium">{rating}/10</span>
              <p className="text-sm text-muted-foreground">{getRatingLabel(rating)}</p>
            </div>
          </div>

          <Slider value={[rating]} min={1} max={10} step={1} onValueChange={handleRatingChange} className="py-4" />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-2 sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Skip
          </Button>
          <Button onClick={handleSubmit}>Submit Rating</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


"use client"

import AnimationCard from "@/components/animation-card"

interface Animation {
  id: string
  title: string
  category: string
  likes: number
  comments: number
  thumbnail: string
  averageRating?: number
  ratingCount?: number
}

interface AnimationGridProps {
  animations: Animation[]
}

export default function AnimationGrid({ animations }: AnimationGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {animations.map((animation) => (
        <AnimationCard key={animation.id} animation={animation} />
      ))}
    </div>
  )
}


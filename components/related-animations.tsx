import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

interface RelatedAnimationsProps {
  currentAnimationId: string
}

export default function RelatedAnimations({ currentAnimationId }: RelatedAnimationsProps) {
  // In a real app, you would fetch related animations based on the current animation
  const relatedAnimations = [
    {
      id: "3",
      title: "Fourier Transforms",
      category: "Mathematics",
      views: 8432,
      thumbnail: "/placeholder.svg?height=90&width=160",
      averageRating: 7.8,
      ratingCount: 156,
    },
    {
      id: "7",
      title: "Relativity Simplified",
      category: "Physics",
      views: 12543,
      thumbnail: "/placeholder.svg?height=90&width=160",
      averageRating: 9.3,
      ratingCount: 215,
    },
    {
      id: "2",
      title: "Neural Networks Explained",
      category: "Computer Science",
      views: 9876,
      thumbnail: "/placeholder.svg?height=90&width=160",
      averageRating: 9.2,
      ratingCount: 187,
    },
    {
      id: "8",
      title: "Game Theory Basics",
      category: "Mathematics",
      views: 6543,
      thumbnail: "/placeholder.svg?height=90&width=160",
      averageRating: 8.6,
      ratingCount: 143,
    },
  ].filter((animation) => animation.id !== currentAnimationId)

  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="mb-4 text-lg font-medium">Related Animations</h3>

      <div className="space-y-4">
        {relatedAnimations.map((animation) => (
          <Link
            key={animation.id}
            href={`/animation/${animation.id}`}
            className="flex gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors"
          >
            <div className="relative h-[90px] w-[160px] flex-shrink-0 overflow-hidden rounded-md">
              <Image
                src={animation.thumbnail || "/placeholder.svg"}
                alt={animation.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h4 className="line-clamp-2 text-sm font-medium">{animation.title}</h4>
              <p className="text-xs text-muted-foreground">{animation.category}</p>
              <div className="mt-1 flex items-center gap-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={
                        star <= Math.round(animation.averageRating / 2)
                          ? "h-3 w-3 fill-yellow-400 text-yellow-400"
                          : "h-3 w-3 text-muted-foreground"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{animation.averageRating.toFixed(1)}</span>
              </div>
              <p className="text-xs text-muted-foreground">{animation.views.toLocaleString()} views</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


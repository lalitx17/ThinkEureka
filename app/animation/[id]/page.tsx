import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Star } from "lucide-react"
import AnimationPlayer from "@/components/animation-player"
import CommentSection from "@/components/comment-section"
import RelatedAnimations from "@/components/related-animations"
import { Button } from "@/components/ui/button"

interface AnimationPageProps {
  params: {
    id: string
  }
}

export default function AnimationPage({ params }: AnimationPageProps) {
  // In a real app, you would fetch the animation data based on the ID
  const animation = {
    id: params.id,
    title: "Quantum Superposition",
    description:
      "This animation explains the concept of quantum superposition, where quantum particles exist in multiple states simultaneously until measured.",
    category: "Physics",
    author: "Dr. Richard Feynman",
    likes: 342,
    views: 12543,
    createdAt: "2023-09-15",
    averageRating: 8.7,
    ratingCount: 243,
  }

  return (
    <div className="container py-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to home
      </Link>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6 overflow-hidden rounded-lg border bg-card">
            <AnimationPlayer animationId={params.id} animationTitle={animation.title} />

            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h1 className="text-2xl font-bold">{animation.title}</h1>

                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={
                          star <= Math.round(animation.averageRating / 2)
                            ? "h-4 w-4 fill-yellow-400 text-yellow-400"
                            : "h-4 w-4 text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{animation.averageRating.toFixed(1)}/10</span>
                  <span className="text-xs text-muted-foreground">({animation.ratingCount} ratings)</span>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span>{animation.views.toLocaleString()} views</span>
                <span>•</span>
                <span>{new Date(animation.createdAt).toLocaleDateString()}</span>
              </div>

              <p className="mb-6 text-muted-foreground">{animation.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    Share
                  </Button>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Category:</span>{" "}
                  <Link href={`/category/${animation.category.toLowerCase()}`} className="text-primary hover:underline">
                    {animation.category}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <CommentSection animationId={params.id} />
        </div>

        <div>
          <div className="mb-6 rounded-lg border bg-card p-4">
            <h3 className="mb-4 text-lg font-medium">About the Creator</h3>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src="/placeholder.svg?height=48&width=48" alt={animation.author} fill className="object-cover" />
              </div>
              <div>
                <p className="font-medium">{animation.author}</p>
                <p className="text-sm text-muted-foreground">Content Creator</p>
              </div>
            </div>
          </div>

          <RelatedAnimations currentAnimationId={params.id} />
        </div>
      </div>
    </div>
  )
}


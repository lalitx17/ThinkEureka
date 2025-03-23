import Image from "next/image";
import Link from "next/link";
import { Star, Heart, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Animation {
  id: string;
  title: string;
  category: string;
  likes: number;
  comments: number;
  thumbnail: string;
  averageRating?: number;
  ratingCount?: number;
  keywords?: string[];
  description?: string;
}

export default function SearchResultItem({
  animation,
}: {
  animation: Animation;
}) {
  // Generate a short description if one isn't provided
  const description =
    animation.description ||
    `Learn about ${animation.title} through this interactive animation. This concept is part of ${animation.category} and has been highly rated by our community.`;

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/30 sm:flex-row">
      <div className="relative aspect-video w-full overflow-hidden rounded-md sm:w-64 md:w-80">
        <Link href={`/animation/${animation.id}`}>
          <Image
            src={animation.thumbnail || "/placeholder.svg"}
            alt={animation.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </Link>
      </div>

      <div className="flex flex-1 flex-col">
        <Link href={`/animation/${animation.id}`} className="group">
          <h3 className="line-clamp-2 text-lg font-medium group-hover:text-primary">
            {animation.title}
          </h3>
        </Link>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center">
            <Clock className="mr-1 h-3.5 w-3.5" />
            10:24
          </span>
          <span>{animation.likes} likes</span>
          <span>{animation.comments} comments</span>
          <Link
            href={`/search?q=${encodeURIComponent(animation.category)}`}
            className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium hover:bg-primary/10"
          >
            {animation.category}
          </Link>
        </div>

        {animation.averageRating !== undefined && (
          <div className="mt-2 flex items-center gap-1">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-4 w-4",
                    star <= Math.round(animation.averageRating / 2)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground",
                  )}
                />
              ))}
            </div>
            <span className="text-sm">
              {animation.averageRating.toFixed(1)}/10 ({animation.ratingCount}{" "}
              ratings)
            </span>
          </div>
        )}

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
          <Button size="sm" asChild>
            <Link href={`/animation/${animation.id}`}>Watch Now</Link>
          </Button>

          <Button size="sm" variant="outline" className="gap-1">
            <Heart className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Save</span>
          </Button>

          <Button size="sm" variant="outline" className="gap-1">
            <MessageCircle className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Comment</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

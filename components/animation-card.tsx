"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AnimationCard({
  animation,
}: {
  animation: AnimationPost;
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(animation.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/animation/${animation.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={animation.thumbnail || "/placeholder.svg"}
            alt={animation.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <span className="inline-block rounded-full bg-primary/90 px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {animation.category}
            </span>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/animation/${animation.id}`}>
          <h3 className="line-clamp-2 font-medium hover:text-primary">
            {animation.title}
          </h3>
        </Link>

        {animation.AverageRating !== undefined && (
          <div className="mt-2 flex items-center gap-1">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-3.5 w-3.5",
                    star <= Math.round(animation.AverageRating / 2)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground",
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {animation.AverageRating.toFixed(1)}/10 ({animation.RatingCount}{" "}
              ratings)
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4 pt-2">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <Heart
            className={cn("h-4 w-4", liked && "fill-primary text-primary")}
          />
          <span>{likeCount}</span>
        </button>
        <Link
          href={`/animation/${animation.id}#comments`}
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{animation.comments?.length || "0"}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}

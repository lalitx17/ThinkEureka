"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Star } from "lucide-react";
import AnimationPlayer from "@/components/animation-player";
import CommentSection from "@/components/comment-section";
import RelatedAnimations from "@/components/related-animations";
import { Button } from "@/components/ui/button";
import { useAnimationById } from "@/hooks/use-getDataById";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const animationCode = `
const LagrangeAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    const gradientColors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

    const draw = (t: number) => {
      // ... (rest of your animation logic)
    };

    draw(0);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-full"
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full h-full border rounded-lg bg-white"
      />
      <div className="absolute bottom-4 left-4 text-sm">
        <span className="text-[#FF6B6B]">Objective Function</span><br/>
        <span className="text-[#4ECDC4]">Constraint</span><br/>
        <span className="text-[#45B7D1]">Gradient Vectors</span>
      </div>
    </motion.div>
  );
};
`;

export default function AnimationPage() {
  const params = useParams();
  const { id } = params;
  const {
    data: animation,
    isLoading,
    isError,
    error,
  } = useAnimationById(id as string);

  if (isLoading) {
    return (
      <div className="container py-6">
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="grid gap-8 md:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-6">
        <div className="text-center text-destructive">
          Error loading animation: {error?.message}
        </div>
      </div>
    );
  }

  if (!animation) {
    return (
      <div className="container py-6">
        <div className="text-center">Animation not found</div>
      </div>
    );
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
            <AnimationPlayer
              animationId={id as string}
              animationTitle={animation.title}
              animationCode={animation.code}
            />

            {/* Rest of your JSX with safe animation access */}
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h1 className="text-2xl font-bold">{animation.title}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={
                          star <=
                          Math.round((animation?.AverageRating ?? 0) / 2)
                            ? "h-4 w-4 fill-yellow-400 text-yellow-400"
                            : "h-4 w-4 text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">
                    {(animation.AverageRating ?? 0).toFixed(1)}/10
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({animation.RatingCount ?? 0} ratings)
                  </span>
                </div>
              </div>

              {/* Add null-safe operators for optional fields */}
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                {/* <span>{(animation.views ?? 0).toLocaleString()} views</span> */}
                {/* <span>•</span> */}
                <span>
                  {animation.createdAt
                    ? new Date(animation.createdAt).toLocaleDateString()
                    : "Unknown date"}
                </span>
              </div>

              <p className="mb-6 text-muted-foreground">
                {animation.description ?? "No description available"}
              </p>

              {/* Rest of your component */}
            </div>
          </div>
          <CommentSection animationId={id as string} />
        </div>

        <div>
          <div className="mb-6 rounded-lg border bg-card p-4">
            <h3 className="mb-4 text-lg font-medium">About the Creator</h3>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={"/placeholder.svg"}
                  alt={"Unknown author"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{"Anonymous"}</p>
                <p className="text-sm text-muted-foreground">Content Creator</p>
              </div>
            </div>
          </div>

          <RelatedAnimations currentAnimationId={id as string} />
        </div>
      </div>
    </div>
  );
}

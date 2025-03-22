import { Search } from "lucide-react";
import AnimationGrid from "@/components/animation-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/footer";
import SearchButton from "@/components/search-button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container py-6">
        <section className="mb-10">
          <div className="mb-6 space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Discover Eureka Moments
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Explore interactive animations that make complex ideas simple to
              understand
            </p>

            <SearchButton />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Mathematics",
              "Physics",
              "Computer Science",
              "Philosophy",
              "Psychology",
            ].map((category) => (
              <Button key={category} variant="outline" className="rounded-full">
                {category}
              </Button>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Trending Concepts
            </h2>
            <Button variant="ghost" className="gap-1">
              View all
            </Button>
          </div>

          <AnimationGrid
            animations={[
              {
                id: "1",
                title: "Quantum Superposition",
                category: "Physics",
                likes: 342,
                comments: 56,
                thumbnail: "/placeholder.svg?height=200&width=350",
              },
              {
                id: "2",
                title: "Neural Networks Explained",
                category: "Computer Science",
                likes: 289,
                comments: 42,
                thumbnail: "/placeholder.svg?height=200&width=350",
              },
              {
                id: "3",
                title: "Fourier Transforms",
                category: "Mathematics",
                likes: 256,
                comments: 38,
                thumbnail: "/placeholder.svg?height=200&width=350",
              },
              {
                id: "4",
                title: "Cognitive Dissonance",
                category: "Psychology",
                likes: 198,
                comments: 27,
                thumbnail: "/placeholder.svg?height=200&width=350",
              },
            ]}
          />
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Recommended For You
            </h2>
            <Button variant="ghost" className="gap-1">
              View all
            </Button>
          </div>

          <AnimationGrid
            animations={[
              {
                id: "5",
                title: "Blockchain Technology",
                category: "Computer Science",
                likes: 176,
                comments: 31,
                thumbnail: "/placeholder.svg?height=200&width=350",
              },
              {
                id: "6",
                title: "Chaos Theory",
                category: "Mathematics",
                likes: 221,
                comments: 35,
                thumbnail: "/placeholder.svg?height=200&width=350",
              },
              {
                id: "7",
                title: "Relativity Simplified",
                category: "Physics",
                likes: 312,
                comments: 48,
                thumbnail: "/placeholder.svg?height=200&width=350",
              },
              {
                id: "8",
                title: "Game Theory Basics",
                category: "Mathematics",
                likes: 187,
                comments: 29,
                thumbnail: "/placeholder.svg?height=200&width=350",
              },
            ]}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

import Link from "next/link";
import { Search } from "lucide-react";
import AnimationGrid from "@/components/animation-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

            <div className="mx-auto flex max-w-md items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search concepts..."
                  className="w-full pl-9 pr-4"
                />
              </div>
              <Button type="submit">Search</Button>
            </div>
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

      <footer className="border-t bg-muted/40">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 text-xl font-bold">
                <span className="text-primary">Abstract</span>
                <span>Learn</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Making abstract concepts simple through interactive animations.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ThinkEureka. All rights
              reserved.
            </p>

            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

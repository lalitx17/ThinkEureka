import { Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimationGrid from "@/components/animation-grid"

export default function SearchPage() {
  // Sample data for trending searches
  const trendingSearches = [
    "quantum physics",
    "neural networks",
    "blockchain",
    "relativity",
    "game theory",
    "cognitive science",
    "chaos theory",
    "algorithms",
  ]

  // Sample data for animations with ratings
  const animations = [
    {
      id: "1",
      title: "Quantum Superposition",
      category: "Physics",
      likes: 342,
      comments: 56,
      thumbnail: "/placeholder.svg?height=200&width=350",
      averageRating: 8.7,
      ratingCount: 243,
    },
    {
      id: "2",
      title: "Neural Networks Explained",
      category: "Computer Science",
      likes: 289,
      comments: 42,
      thumbnail: "/placeholder.svg?height=200&width=350",
      averageRating: 9.2,
      ratingCount: 187,
    },
    {
      id: "3",
      title: "Fourier Transforms",
      category: "Mathematics",
      likes: 256,
      comments: 38,
      thumbnail: "/placeholder.svg?height=200&width=350",
      averageRating: 7.8,
      ratingCount: 156,
    },
    {
      id: "4",
      title: "Cognitive Dissonance",
      category: "Psychology",
      likes: 198,
      comments: 27,
      thumbnail: "/placeholder.svg?height=200&width=350",
      averageRating: 8.3,
      ratingCount: 112,
    },
  ]

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-2xl font-bold">Search</h1>

      <div className="mb-8 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search concepts..." className="w-full pl-9 pr-4" />
        </div>
        <Button type="submit">Search</Button>
      </div>

      <div className="mb-8">
        <h2 className="mb-3 text-lg font-medium">Trending Searches</h2>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="rounded-full border bg-background px-3 py-1 text-sm hover:bg-muted"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {["All", "Mathematics", "Physics", "Computer Science", "Philosophy", "Psychology"].map((category, index) => (
          <Button key={category} variant={index === 0 ? "default" : "outline"} className="rounded-full">
            {category}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="animations">Animations</TabsTrigger>
          <TabsTrigger value="creators">Creators</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <section>
            <h2 className="mb-4 text-xl font-semibold">Recommended For You</h2>
            <AnimationGrid animations={animations} />
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Top Rated</h2>
            <AnimationGrid
              animations={[
                {
                  id: "5",
                  title: "Blockchain Technology",
                  category: "Computer Science",
                  likes: 176,
                  comments: 31,
                  thumbnail: "/placeholder.svg?height=200&width=350",
                  averageRating: 9.5,
                  ratingCount: 98,
                },
                {
                  id: "6",
                  title: "Chaos Theory",
                  category: "Mathematics",
                  likes: 221,
                  comments: 35,
                  thumbnail: "/placeholder.svg?height=200&width=350",
                  averageRating: 8.9,
                  ratingCount: 132,
                },
                {
                  id: "7",
                  title: "Relativity Simplified",
                  category: "Physics",
                  likes: 312,
                  comments: 48,
                  thumbnail: "/placeholder.svg?height=200&width=350",
                  averageRating: 9.3,
                  ratingCount: 215,
                },
                {
                  id: "8",
                  title: "Game Theory Basics",
                  category: "Mathematics",
                  likes: 187,
                  comments: 29,
                  thumbnail: "/placeholder.svg?height=200&width=350",
                  averageRating: 8.6,
                  ratingCount: 143,
                },
              ]}
            />
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Recently Added</h2>
            <AnimationGrid
              animations={[
                {
                  id: "9",
                  title: "String Theory Explained",
                  category: "Physics",
                  likes: 124,
                  comments: 18,
                  thumbnail: "/placeholder.svg?height=200&width=350",
                  averageRating: 7.9,
                  ratingCount: 42,
                },
                {
                  id: "10",
                  title: "Cryptography Fundamentals",
                  category: "Computer Science",
                  likes: 156,
                  comments: 23,
                  thumbnail: "/placeholder.svg?height=200&width=350",
                  averageRating: 8.2,
                  ratingCount: 67,
                },
                {
                  id: "11",
                  title: "Behavioral Economics",
                  category: "Economics",
                  likes: 98,
                  comments: 14,
                  thumbnail: "/placeholder.svg?height=200&width=350",
                  averageRating: 8.0,
                  ratingCount: 35,
                },
                {
                  id: "12",
                  title: "Topology Basics",
                  category: "Mathematics",
                  likes: 112,
                  comments: 19,
                  thumbnail: "/placeholder.svg?height=200&width=350",
                  averageRating: 7.5,
                  ratingCount: 28,
                },
              ]}
            />
          </section>
        </TabsContent>

        <TabsContent value="animations">
          <AnimationGrid
            animations={[
              {
                id: "1",
                title: "Quantum Superposition",
                category: "Physics",
                likes: 342,
                comments: 56,
                thumbnail: "/placeholder.svg?height=200&width=350",
                averageRating: 8.7,
                ratingCount: 243,
              },
              {
                id: "2",
                title: "Neural Networks Explained",
                category: "Computer Science",
                likes: 289,
                comments: 42,
                thumbnail: "/placeholder.svg?height=200&width=350",
                averageRating: 9.2,
                ratingCount: 187,
              },
              {
                id: "3",
                title: "Fourier Transforms",
                category: "Mathematics",
                likes: 256,
                comments: 38,
                thumbnail: "/placeholder.svg?height=200&width=350",
                averageRating: 7.8,
                ratingCount: 156,
              },
              {
                id: "4",
                title: "Cognitive Dissonance",
                category: "Psychology",
                likes: 198,
                comments: 27,
                thumbnail: "/placeholder.svg?height=200&width=350",
                averageRating: 8.3,
                ratingCount: 112,
              },
              {
                id: "5",
                title: "Blockchain Technology",
                category: "Computer Science",
                likes: 176,
                comments: 31,
                thumbnail: "/placeholder.svg?height=200&width=350",
                averageRating: 9.5,
                ratingCount: 98,
              },
              {
                id: "6",
                title: "Chaos Theory",
                category: "Mathematics",
                likes: 221,
                comments: 35,
                thumbnail: "/placeholder.svg?height=200&width=350",
                averageRating: 8.9,
                ratingCount: 132,
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="creators">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "1",
                name: "Dr. Richard Feynman",
                specialty: "Physics",
                followers: 12543,
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "2",
                name: "Prof. Ada Lovelace",
                specialty: "Computer Science",
                followers: 9876,
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "3",
                name: "Dr. Marie Curie",
                specialty: "Chemistry & Physics",
                followers: 11234,
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "4",
                name: "Prof. Alan Turing",
                specialty: "Mathematics & Computing",
                followers: 10432,
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "5",
                name: "Dr. Carl Jung",
                specialty: "Psychology",
                followers: 8765,
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "6",
                name: "Prof. Stephen Hawking",
                specialty: "Theoretical Physics",
                followers: 14321,
                avatar: "/placeholder.svg?height=80&width=80",
              },
            ].map((creator) => (
              <div key={creator.id} className="flex items-center gap-4 rounded-lg border p-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-full">
                  <img
                    src={creator.avatar || "/placeholder.svg"}
                    alt={creator.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{creator.name}</h3>
                  <p className="text-sm text-muted-foreground">{creator.specialty}</p>
                  <p className="text-sm text-muted-foreground">{creator.followers.toLocaleString()} followers</p>
                  <Button size="sm" className="mt-2">
                    Follow
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


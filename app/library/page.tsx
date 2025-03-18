import { Bookmark, Clock, Heart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimationGrid from "@/components/animation-grid"

export default function LibraryPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-2xl font-bold">Your Library</h1>

      <Tabs defaultValue="saved" className="space-y-6">
        <TabsList>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="liked">Liked</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Saved Animations</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bookmark className="h-4 w-4" />
              <span>3 animations</span>
            </div>
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
                id: "3",
                title: "Fourier Transforms",
                category: "Mathematics",
                likes: 256,
                comments: 38,
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
            ]}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recently Watched</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last 30 days</span>
            </div>
          </div>

          <AnimationGrid
            animations={[
              {
                id: "2",
                title: "Neural Networks Explained",
                category: "Computer Science",
                likes: 289,
                comments: 42,
                thumbnail: "/placeholder.svg?height=200&width=350",
              },
              {
                id: "5",
                title: "Blockchain Technology",
                category: "Computer Science",
                likes: 176,
                comments: 31,
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
        </TabsContent>

        <TabsContent value="liked" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Liked Animations</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span>3 animations</span>
            </div>
          </div>

          <AnimationGrid
            animations={[
              {
                id: "6",
                title: "Chaos Theory",
                category: "Mathematics",
                likes: 221,
                comments: 35,
                thumbnail: "/placeholder.svg?height=200&width=350",
              },
              {
                id: "1",
                title: "Quantum Superposition",
                category: "Physics",
                likes: 342,
                comments: 56,
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
        </TabsContent>
      </Tabs>
    </div>
  )
}


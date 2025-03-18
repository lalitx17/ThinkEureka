import Image from "next/image";
import Link from "next/link";
import { Bookmark, Clock, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountPage() {
  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src="/placeholder.svg?height=64&width=64"
              alt="User avatar"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">john.doe@example.com</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/account/settings">Settings</Link>
          </Button>
          <Button>Edit Profile</Button>
        </div>
      </div>

      <Tabs defaultValue="saved" className="space-y-4">
        <TabsList>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="liked">Liked</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Saved Animations</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "1",
                title: "Quantum Superposition",
                category: "Physics",
                savedAt: "2 days ago",
                thumbnail: "/placeholder.svg?height=150&width=300",
              },
              {
                id: "3",
                title: "Fourier Transforms",
                category: "Mathematics",
                savedAt: "1 week ago",
                thumbnail: "/placeholder.svg?height=150&width=300",
              },
              {
                id: "7",
                title: "Relativity Simplified",
                category: "Physics",
                savedAt: "3 weeks ago",
                thumbnail: "/placeholder.svg?height=150&width=300",
              },
            ].map((animation) => (
              <Card key={animation.id}>
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <Image
                    src={animation.thumbnail || "/placeholder.svg"}
                    alt={animation.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="inline-block rounded-full bg-primary/90 px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      {animation.category}
                    </span>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="line-clamp-1 text-base">
                    <Link
                      href={`/animation/${animation.id}`}
                      className="hover:text-primary"
                    >
                      {animation.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Bookmark className="h-3 w-3" />
                    <span>Saved {animation.savedAt}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/animation/${animation.id}`}>Watch Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {false && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Bookmark className="mb-2 h-10 w-10 text-muted-foreground" />
              <h3 className="mb-1 text-lg font-medium">No saved animations</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Animations you save will appear here.
              </p>
              <Button asChild>
                <Link href="/">Explore Animations</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recently Watched</h2>
            <Button variant="ghost" size="sm">
              Clear History
            </Button>
          </div>

          <div className="space-y-4">
            {[
              {
                id: "2",
                title: "Neural Networks Explained",
                category: "Computer Science",
                watchedAt: "Today, 2:30 PM",
                progress: 75,
                duration: "12:45",
                thumbnail: "/placeholder.svg?height=120&width=200",
              },
              {
                id: "5",
                title: "Blockchain Technology",
                category: "Computer Science",
                watchedAt: "Yesterday, 10:15 AM",
                progress: 100,
                duration: "8:20",
                thumbnail: "/placeholder.svg?height=120&width=200",
              },
              {
                id: "4",
                title: "Cognitive Dissonance",
                category: "Psychology",
                watchedAt: "3 days ago",
                progress: 30,
                duration: "15:10",
                thumbnail: "/placeholder.svg?height=120&width=200",
              },
            ].map((animation) => (
              <div
                key={animation.id}
                className="flex gap-4 rounded-lg border p-4"
              >
                <div className="relative h-[120px] w-[200px] flex-shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={animation.thumbnail || "/placeholder.svg"}
                    alt={animation.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${animation.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-medium">
                      <Link
                        href={`/animation/${animation.id}`}
                        className="hover:text-primary"
                      >
                        {animation.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {animation.category}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Watched {animation.watchedAt}</span>
                      <span>•</span>
                      <span>{animation.duration}</span>
                    </div>

                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/animation/${animation.id}`}>
                        {animation.progress === 100
                          ? "Watch Again"
                          : "Continue"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Liked Animations</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "6",
                title: "Chaos Theory",
                category: "Mathematics",
                likedAt: "1 day ago",
                thumbnail: "/placeholder.svg?height=150&width=300",
              },
              {
                id: "1",
                title: "Quantum Superposition",
                category: "Physics",
                likedAt: "3 days ago",
                thumbnail: "/placeholder.svg?height=150&width=300",
              },
              {
                id: "8",
                title: "Game Theory Basics",
                category: "Mathematics",
                likedAt: "1 week ago",
                thumbnail: "/placeholder.svg?height=150&width=300",
              },
            ].map((animation) => (
              <Card key={animation.id}>
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <Image
                    src={animation.thumbnail || "/placeholder.svg"}
                    alt={animation.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="inline-block rounded-full bg-primary/90 px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      {animation.category}
                    </span>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="line-clamp-1 text-base">
                    <Link
                      href={`/animation/${animation.id}`}
                      className="hover:text-primary"
                    >
                      {animation.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Heart className="h-3 w-3 fill-primary text-primary" />
                    <span>Liked {animation.likedAt}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/animation/${animation.id}`}>Watch Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

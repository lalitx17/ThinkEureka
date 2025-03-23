"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchResultsList from "@/components/search-results-list";

// Sample data for all animations
const allAnimations = [
  {
    id: "1",
    title: "Quantum Superposition",
    category: "Physics",
    likes: 342,
    comments: 56,
    thumbnail: "/placeholder.svg?height=200&width=350",
    averageRating: 8.7,
    ratingCount: 243,
    keywords: [
      "quantum",
      "physics",
      "superposition",
      "quantum mechanics",
      "wave function",
    ],
    description:
      "Explore the fascinating world of quantum mechanics through this interactive animation explaining how particles can exist in multiple states simultaneously until measured.",
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
    keywords: [
      "neural networks",
      "ai",
      "machine learning",
      "deep learning",
      "computer science",
    ],
    description:
      "Understand how artificial neural networks function by mimicking the human brain. This animation breaks down complex concepts into simple visual explanations.",
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
    keywords: [
      "fourier",
      "mathematics",
      "transforms",
      "signal processing",
      "waves",
    ],
    description:
      "Visualize how Fourier transforms convert signals between time and frequency domains, a fundamental concept in signal processing and data analysis.",
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
    keywords: ["cognitive", "psychology", "dissonance", "behavior", "mind"],
    description:
      "Discover how conflicting beliefs create psychological discomfort and how humans resolve these internal conflicts through various mental strategies.",
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
    keywords: [
      "blockchain",
      "cryptocurrency",
      "distributed ledger",
      "computer science",
      "bitcoin",
    ],
    description:
      "Learn how blockchain creates secure, decentralized record-keeping through this step-by-step animation of transactions, blocks, and consensus mechanisms.",
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
    keywords: [
      "chaos",
      "mathematics",
      "butterfly effect",
      "complex systems",
      "deterministic",
    ],
    description:
      "Explore how small changes in initial conditions can lead to vastly different outcomes in deterministic systems, illustrated through captivating visual examples.",
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
    keywords: ["relativity", "physics", "einstein", "spacetime", "gravity"],
    description:
      "Einstein's theories of relativity explained through intuitive animations that demonstrate how space, time, and gravity are interconnected in our universe.",
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
    keywords: [
      "game theory",
      "mathematics",
      "strategy",
      "nash equilibrium",
      "decision making",
    ],
    description:
      "Understand strategic decision-making through interactive examples of classic game theory scenarios like the Prisoner's Dilemma and Nash Equilibrium.",
  },
  {
    id: "9",
    title: "String Theory Explained",
    category: "Physics",
    likes: 124,
    comments: 18,
    thumbnail: "/placeholder.svg?height=200&width=350",
    averageRating: 7.9,
    ratingCount: 42,
    keywords: [
      "string theory",
      "physics",
      "quantum gravity",
      "dimensions",
      "unified theory",
    ],
    description:
      "Dive into the theoretical framework where one-dimensional strings replace point-like particles as the fundamental building blocks of the universe.",
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
    keywords: [
      "cryptography",
      "encryption",
      "security",
      "computer science",
      "ciphers",
    ],
    description:
      "Learn the principles of secure communication through visual demonstrations of encryption algorithms, key exchange methods, and digital signatures.",
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
    keywords: [
      "behavioral",
      "economics",
      "psychology",
      "decision making",
      "irrationality",
    ],
    description:
      "Explore how psychological, social, and emotional factors influence economic decisions, challenging traditional models of rational economic behavior.",
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
    keywords: [
      "topology",
      "mathematics",
      "shapes",
      "continuous deformation",
      "manifolds",
    ],
    description:
      "Discover the mathematical study of shapes and spaces that are preserved under continuous deformations, from simple Möbius strips to complex manifolds.",
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredAnimations, setFilteredAnimations] = useState(allAnimations);

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
  ];

  // Filter animations based on search query and selected category
  useEffect(() => {
    let results = [...allAnimations];

    // Filter by search query
    if (queryParam) {
      const query = queryParam.toLowerCase();
      results = results.filter(
        (animation) =>
          animation.title.toLowerCase().includes(query) ||
          animation.category.toLowerCase().includes(query) ||
          animation.keywords?.some((keyword) =>
            keyword.toLowerCase().includes(query),
          ) ||
          animation.description?.toLowerCase().includes(query),
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter(
        (animation) => animation.category === selectedCategory,
      );
    }

    setFilteredAnimations(results);
  }, [queryParam, selectedCategory]);

  // Update search query when URL parameter changes
  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">
        {queryParam ? `Search Results for "${queryParam}"` : "Search"}
      </h1>

      <form
        onSubmit={handleSearch}
        className="mb-8 flex items-center gap-2 max-w-2xl mx-auto"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search concepts..."
            className="w-full pl-9 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {!queryParam && (
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-lg font-medium">Trending Searches</h2>
          <div className="flex flex-wrap justify-center gap-2">
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
      )}

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {[
          "All",
          "Mathematics",
          "Physics",
          "Computer Science",
          "Economics",
          "Psychology",
        ].map((category) => (
          <Button
            key={category}
            variant={category === selectedCategory ? "default" : "outline"}
            className="rounded-full"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {filteredAnimations.length > 0 ? (
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="animations">Animations</TabsTrigger>
            <TabsTrigger value="creators">Creators</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <section>
              <h2 className="mb-4 text-xl font-semibold">
                {queryParam
                  ? `Results for "${queryParam}"`
                  : "Recommended For You"}
              </h2>
              <SearchResultsList animations={filteredAnimations} />
            </section>
          </TabsContent>

          <TabsContent value="animations">
            <SearchResultsList animations={filteredAnimations} />
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
              ]
                // Filter creators based on search query if needed
                .filter(
                  (creator) =>
                    !queryParam ||
                    creator.name
                      .toLowerCase()
                      .includes(queryParam.toLowerCase()) ||
                    creator.specialty
                      .toLowerCase()
                      .includes(queryParam.toLowerCase()),
                )
                .map((creator) => (
                  <div
                    key={creator.id}
                    className="flex items-center gap-4 rounded-lg border p-4"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-full">
                      <img
                        src={creator.avatar || "/placeholder.svg"}
                        alt={creator.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{creator.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {creator.specialty}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {creator.followers.toLocaleString()} followers
                      </p>
                      <Button size="sm" className="mt-2">
                        Follow
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">No results found</h2>
          <p className="mb-6 text-muted-foreground">
            We couldn't find any animations matching "{queryParam}". Try a
            different search term.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <h3 className="w-full mb-2 text-sm font-medium">
              Try searching for:
            </h3>
            {trendingSearches.slice(0, 5).map((term) => (
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
      )}
    </div>
  );
}

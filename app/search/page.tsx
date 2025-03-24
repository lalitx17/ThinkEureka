"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchResultsList from "@/components/search-results-list";
import { allAnimations } from "@/lib/allAnimations";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";

  // Use a ref to track if we've already made a request for this query
  const requestedQueryRef = useRef<string | null>(null);

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredAnimations, setFilteredAnimations] = useState(allAnimations);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAnimation, setGeneratedAnimation] =
    useState<AnimationData | null>(null);

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

  // Function to fetch data from the API
  const fetchGeneratedAnimation = async (query: string) => {
    try {
      const response = await fetch("/api/genanimation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: AnimationData = await response.json();
      console.log("API response:", data);
      setGeneratedAnimation(data);
    } catch (error) {
      console.error("Error fetching from API:", error);
    }
  };

  useEffect(() => {
    if (queryParam && requestedQueryRef.current !== queryParam) {
      // Track that we've made a request for this query
      requestedQueryRef.current = queryParam;

      setIsLoading(true);
      fetchGeneratedAnimation(queryParam).finally(() => setIsLoading(false));
    }
  }, [queryParam]);

  // Handle filtering separately
  useEffect(() => {
    let results = [...allAnimations];

    // Filter by search query
    if (queryParam) {
      const query = queryParam.toLowerCase();
      results = results.filter(
        (animation) =>
          animation.title.toLowerCase().includes(query) ||
          animation.category.toLowerCase().includes(query) ||
          animation.description?.toLowerCase().includes(query),
      );
    }

    if (selectedCategory !== "All") {
      results = results.filter(
        (animation) => animation.category === selectedCategory,
      );
    }

    if (
      generatedAnimation &&
      (selectedCategory === "All" ||
        generatedAnimation.category === selectedCategory)
    ) {
      results = [generatedAnimation, ...results];
    }

    setFilteredAnimations(results);
  }, [queryParam, selectedCategory, generatedAnimation, allAnimations]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Reset the requested query ref when user initiates a new search
      requestedQueryRef.current = null;
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>

      {isLoading && (
        <div className="text-center py-4">
          <p>Generating animation for "{queryParam}"...</p>
          {/* You can add a loading spinner here if you want */}
        </div>
      )}

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

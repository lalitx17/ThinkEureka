import { Search } from "lucide-react";
import AnimationGrid from "@/components/animation-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/footer";
import SearchButton from "@/components/search-button";
import Link from "next/link";
import HomePageAnimation from "@/components/homepage-animation";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import MainNav from "@/components/main-nav";

export default async function HomePage() {
  const session = await auth();
  console.log(session);

  if (!session) {
    redirect("/auth/login");
    return null;
  }

  return (
    <MainNav>
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
                <Link
                  key={category}
                  href={`/search?q=${encodeURIComponent(category)}`}
                >
                  <Button variant="outline" className="rounded-full">
                    {category}
                  </Button>
                </Link>
              ))}
            </div>
          </section>
          <HomePageAnimation />
        </main>
        <Footer />
      </div>
    </MainNav>
  );
}

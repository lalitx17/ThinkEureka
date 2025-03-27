"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Library, Search, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainNavProps {
  children: React.ReactNode;
}

export default function MainNav({ children }: MainNavProps) {
  const pathname = usePathname();
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Simulate authentication check
  useEffect(() => {
    // For demo purposes, we'll consider the user signed in if they're on account pages
    setIsSignedIn(pathname.startsWith("/account"));
  }, [pathname]);

  return (
    <>
      {/* Desktop and tablet navbar */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4 max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-primary">ThinkEureka</span>
          </Link>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="User avatar"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/account">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/account">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Mobile tab bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-background md:hidden">
        <div className="grid h-16 grid-cols-4">
          <Link
            href="/"
            className={`flex flex-col items-center justify-center gap-1 ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            href="/search"
            className={`flex flex-col items-center justify-center gap-1 ${
              pathname === "/search" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs">Search</span>
          </Link>

          <Link
            href="/library"
            className={`flex flex-col items-center justify-center gap-1 ${
              pathname === "/library" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Library className="h-5 w-5" />
            <span className="text-xs">Library</span>
          </Link>

          <Link
            href="/account"
            className={`flex flex-col items-center justify-center gap-1 ${
              pathname.startsWith("/account")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Account</span>
          </Link>
        </div>
      </div>
    </>
  );
}

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/main-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThinkEureka",
  description: 'Animations that spark "Aha!" moments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
            storageKey="theme"
          >
            <div className="flex min-h-screen flex-col pb-16 md:pb-0 mx-auto">
              <MainNav />
              <main className="flex-1 w-full">{children}</main>
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

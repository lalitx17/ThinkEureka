"use server";

import { prisma } from "@/lib/prisma";

export async function getAnimationsByCategories() {
  const categories = [
    "Mathematics",
    "Physics",
    "Computer Science",
    "Economics",
  ];

  try {
    const animationsByCategory = await Promise.all(
      categories.map(async (category) => {
        const animations = await prisma.animationPost.findMany({
          where: { category },
          take: 4,
          orderBy: { createdAt: "desc" },
        });
        return { category, animations };
      }),
    );

    return { animationsByCategory };
  } catch (error) {
    return { error: "Failed to fetch animations by categories" };
  }
}

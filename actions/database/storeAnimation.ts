"use server";

import { prisma } from "@/lib/prisma";

export async function createAnimationPost(data: AnimationData) {
  try {
    const requiredFields: (keyof AnimationData)[] = [
      "title",
      "code",
      "thumbnail",
      "description",
      "category",
      "level",
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    const newPost = await prisma.animationPost.create({
      data: {
        title: data.title,
        code: data.code,
        thumbnail: data.thumbnail,
        description: data.description,
        category: data.category,
        level: data.level,
        likes: data.likes || 0,
        comments: data.comments || 0,
        AverageRating: data.averageRating || 0,
        RatingCount: data.ratingCount || 0,
      },
    });

    return { id: newPost.id, success: true };
  } catch (error) {
    console.error("Failed to create animation post:", error);
    return { error: "Failed to create animation post", success: false };
  }
}

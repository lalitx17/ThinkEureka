"use server";

import prisma from "@/lib/prisma";

export async function createAnimationPost(data: AnimationPost) {
  try {
    const requiredFields: (keyof AnimationPost)[] = [
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
        comments: {
          create: data.comments || [],
        },
        AverageRating: data.AverageRating || 0,
        RatingCount: data.RatingCount || 0,
      },
    });

    return { id: newPost.id, success: true };
  } catch (error) {
    console.error("Failed to create animation post:", error);
    return { error: "Failed to create animation post", success: false };
  }
}

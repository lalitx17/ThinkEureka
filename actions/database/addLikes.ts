"use server";

import prisma from "@/lib/prisma";
import type { AnimationPost, User } from "@prisma/client";

interface ToggleLikeParams {
  postId: AnimationPost["id"];
  userId: User["id"];
}

export const toggleLike = async ({ postId, userId }: ToggleLikeParams) => {
  try {
    const existingLike = await prisma.animationPost.findFirst({
      where: {
        id: postId,
        likedBy: { some: { id: userId } },
      },
    });

    // Determine the operation
    const isLiking = !existingLike;

    // Transaction for atomic updates
    await prisma.$transaction([
      prisma.animationPost.update({
        where: { id: postId },
        data: {
          likes: { [isLiking ? "increment" : "decrement"]: 1 },
          likedBy: { [isLiking ? "connect" : "disconnect"]: { id: userId } },
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          likedPosts: { [isLiking ? "connect" : "disconnect"]: { id: postId } },
        },
      }),
    ]);

    return {
      success: true,
      message: isLiking
        ? "Post liked successfully"
        : "Post unliked successfully",
      isLiked: isLiking,
    };
  } catch (error) {
    console.error("Toggle like failed:", error);
    return {
      success: false,
      message: "Failed to toggle like",
      isLiked: null,
    };
  }
};

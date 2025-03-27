"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addComment(formData: FormData) {
  const content = formData.get("content") as string;
  const userId = formData.get("userId") as string;
  const postId = formData.get("postId") as string;

  if (!content || !userId || !postId) {
    throw new Error("Missing required fields");
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        userId,
        AnimationPostId: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    // Revalidate the post page to show the new comment
    revalidatePath(`/posts/${postId}`);

    return { success: true, comment: newComment };
  } catch (error) {
    console.error("Failed to add comment:", error);
    return { success: false, error: "Failed to add comment" };
  }
}

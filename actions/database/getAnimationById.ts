"use server";

import prisma from "@/lib/prisma";

export async function getAnimationById(id: string) {
  try {
    const animation = await prisma.animationPost.findUnique({
      where: {
        id: id,
      },
    });

    if (!animation) {
      return { error: "Animation not found", success: false };
    }

    return { animation, success: true };
  } catch (error) {
    console.error("Failed to fetch animation:", error);
    return { error: "Failed to fetch animation", success: false };
  }
}

// hooks/useAddComment.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "@/actions/database/addComments"; // Your server action

interface AddCommentParams {
  content: string;
  userId: string;
  postId: string;
}

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, userId, postId }: AddCommentParams) => {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("userId", userId);
      formData.append("postId", postId);

      const result = await addComment(formData);

      if (!result.success) {
        throw new Error(result.error || "Failed to add comment");
      }

      return result;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch the comments query to update the UI
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });

      // Optionally, you can also update the post query if it contains comment count
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "@/actions/database/addLikes"; // Import the server action directly

interface ToggleLikeParams {
  postId: string;
  userId: string;
}

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleLike,
    onMutate: async ({ postId, userId }) => {
      await queryClient.cancelQueries({ queryKey: ["post", postId] });

      const previousPost = queryClient.getQueryData(["post", postId]);

      queryClient.setQueryData(["post", postId], (oldData: any) => {
        if (!oldData) return oldData;

        const isLiked = oldData.likedBy.some((user: any) => user.id === userId);
        const newLikedBy = isLiked
          ? oldData.likedBy.filter((user: any) => user.id !== userId)
          : [...oldData.likedBy, { id: userId }];

        return {
          ...oldData,
          likes: isLiked ? oldData.likes - 1 : oldData.likes + 1,
          likedBy: newLikedBy,
        };
      });

      return { previousPost };
    },
    onError: (err, { postId }, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost);
      }
    },
    onSettled: (data, error, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
};

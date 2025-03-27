import { useQuery } from "@tanstack/react-query";
import { getAnimationById } from "@/actions/database/getAnimationById";

export function useAnimationById(id: string) {
  return useQuery({
    queryKey: ["animation", id],
    queryFn: async () => {
      const result = await getAnimationById(id);
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch animation");
      }
      return result.animation;
    },
    enabled: !!id,
  });
}

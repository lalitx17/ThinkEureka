import { useQuery } from "@tanstack/react-query";
import { getAnimationsByCategories } from "@/actions/database/getFourAnimations";

export function useAnimationsByCategories() {
  return useQuery({
    queryKey: ["animationsByCategories"],
    queryFn: async () => {
      const result = await getAnimationsByCategories();
      if ("error" in result) {
        throw new Error(result.error);
      }
      return result.animationsByCategory;
    },
  });
}

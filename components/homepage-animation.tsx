"use client";
import AnimationGrid from "@/components/animation-grid";
import { useAnimationsByCategories } from "@/hooks/use-getAllAnimations";

export default function HomePageAnimation() {
  const { data: categoryGroups } = useAnimationsByCategories();

  console.log(categoryGroups);

  const categories = [
    "Mathematics",
    "Physics",
    "Computer Science",
    "Economics",
  ];

  return (
    <div>
      {categories.map((category) => {
        // Find the category group matching the current category
        const categoryGroup = categoryGroups?.find(
          (group) => group.category === category,
        );

        return (
          <section key={category} className="mb-10">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">
                {category}
              </h2>
            </div>
            <AnimationGrid animations={categoryGroup?.animations || []} />
          </section>
        );
      })}
    </div>
  );
}

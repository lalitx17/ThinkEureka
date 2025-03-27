import SearchResultItem from "@/components/search-result-item";

export default function SearchResultsList({
  animations,
}: SearchResultsListProps) {
  return (
    <div className="space-y-4">
      {animations.map((animation: AnimationPost) => (
        <SearchResultItem key={animation.id} animation={animation} />
      ))}
    </div>
  );
}

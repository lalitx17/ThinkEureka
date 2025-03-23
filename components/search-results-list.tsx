import SearchResultItem from "@/components/search-result-item";

interface Animation {
  id: string;
  title: string;
  category: string;
  likes: number;
  comments: number;
  thumbnail: string;
  averageRating?: number;
  ratingCount?: number;
  keywords?: string[];
  description?: string;
}

interface SearchResultsListProps {
  animations: Animation[];
}

export default function SearchResultsList({
  animations,
}: SearchResultsListProps) {
  return (
    <div className="space-y-4">
      {animations.map((animation) => (
        <SearchResultItem key={animation.id} animation={animation} />
      ))}
    </div>
  );
}

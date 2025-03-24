interface AnimationData {
  id: string;
  title: string;
  category: string;
  code: string;
  likes: number;
  level: string;
  comments: number;
  thumbnail: string;
  averageRating: number;
  ratingCount: number;
  description: string;
}

interface SearchResultsListProps {
  animations: AnimationData[];
}

interface AnimationData {
  id: string;
  title: string;
  category: string;
  code: string;
  likes: number;
  comments: number;
  thumbnail: string;
  averageRating: number;
  ratingCount: number;
  description: string;
}

interface SearchResultsListProps {
  animations: AnimationData[];
}
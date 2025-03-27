interface User {
  id: string;
  email: string;
  username: string;
}

interface Comment {
  id: string;
  content: string;
  user: User;
  userId: string;
  AnimationPostId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AnimationPost {
  id: string;
  title: string;
  code: string;
  thumbnail: string;
  description: string;
  category: string;
  level: string;
  likes: number;
  comments?: Comment[];
  AverageRating: number;
  RatingCount: number;
  createdAt: Date;
  updatedAt: Date;
  likedBy?: User[];
  savedBy?: User[];
}

interface SearchResultsListProps {
  animations: AnimationData[];
}

"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useAddComment } from "@/hooks/use-addComment";

type CommentSectionProps = {
  animationId: string;
  initialComments?: Comment[];
};

export default function CommentSection({
  animationId,
  initialComments = [],
}: CommentSectionProps) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const { mutate: addComment } = useAddComment();

  const handleSubmitComment = async () => {
    if (!session?.user?.id || !commentText.trim()) return;

    setIsSubmitting(true);

    addComment(
      {
        content: commentText,
        userId: session.user.id,
        postId: animationId,
      },
      {
        onSuccess: (response) => {
          if (response?.success && response.comment) {
            setComments((prev) => [...prev, response.comment as Comment]);
            setCommentText("");
          }
        },
        onError: (error) => {
          console.error("Error adding comment:", error);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <div className="rounded-lg border bg-card" id="comments">
      <div className="p-6">
        <h2 className="mb-6 text-xl font-semibold">
          Comments ({comments.length})
        </h2>
        <div className="mb-6 flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-2 min-h-[80px] resize-none"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={!commentText.trim() || isSubmitting || !session}
              >
                {isSubmitting ? "Submitting..." : "Comment"}
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {comment.user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user.username}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

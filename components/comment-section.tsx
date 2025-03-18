"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  content: string
  timestamp: string
  likes: number
}

interface CommentSectionProps {
  animationId: string
}

export default function CommentSection({ animationId }: CommentSectionProps) {
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      content:
        "This animation really helped me understand quantum superposition. I've been struggling with this concept for weeks!",
      timestamp: "2 days ago",
      likes: 24,
    },
    {
      id: "2",
      user: {
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MG",
      },
      content: "Could you explain how this relates to quantum computing? I'm trying to understand qubits better.",
      timestamp: "1 day ago",
      likes: 12,
    },
    {
      id: "3",
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "DK",
      },
      content:
        "The visualization of the probability cloud is excellent. It makes the abstract concept much more tangible.",
      timestamp: "10 hours ago",
      likes: 8,
    },
  ])

  const handleSubmitComment = () => {
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "YO",
      },
      content: commentText,
      timestamp: "Just now",
      likes: 0,
    }

    setComments([newComment, ...comments])
    setCommentText("")
  }

  return (
    <div className="rounded-lg border bg-card" id="comments">
      <div className="p-6">
        <h2 className="mb-6 text-xl font-semibold">Comments ({comments.length})</h2>

        <div className="mb-6 flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
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
              <Button onClick={handleSubmitComment} disabled={!commentText.trim()}>
                Comment
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                <AvatarFallback>{comment.user.initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>

                <p className="mt-1 text-sm">{comment.content}</p>

                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <button className="hover:text-foreground">Like ({comment.likes})</button>
                  <button className="hover:text-foreground">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


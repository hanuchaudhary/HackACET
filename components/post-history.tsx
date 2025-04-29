"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BarChart2, Twitter } from "lucide-react"

interface Post {
  id: string
  text: string
  image: string
  date: string
  likes: number
  retweets: number
  views: number
  status: "published" | "scheduled"
}

const mockPosts: Post[] = [
  {
    id: "1",
    text: "5 essential productivity tips that will transform your workflow #productivity #timemanagement",
    image: "/placeholder.svg?height=200&width=400",
    date: "2025-04-25T10:30:00Z",
    likes: 42,
    retweets: 12,
    views: 1024,
    status: "published",
  },
  {
    id: "2",
    text: "The future of AI is here! Check out these innovative approaches #AI #innovation",
    image: "/placeholder.svg?height=200&width=400",
    date: "2025-04-22T14:15:00Z",
    likes: 78,
    retweets: 23,
    views: 2048,
    status: "published",
  },
  {
    id: "3",
    text: "How remote work is changing the way we collaborate in 2025 #remotework #futureofwork",
    image: "/placeholder.svg?height=200&width=400",
    date: "2025-04-30T09:00:00Z",
    likes: 0,
    retweets: 0,
    views: 0,
    status: "scheduled",
  },
]

export function PostHistory() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Your Posts</h2>
      </div>

      <div className="grid gap-4">
        {mockPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="grid gap-4 md:grid-cols-[1fr_200px]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={post.status === "published" ? "default" : "outline"}>
                      {post.status === "published" ? "Published" : "Scheduled"}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatDate(post.date)}
                    </div>
                  </div>
                  <p>{post.text}</p>
                  {post.status === "published" && (
                    <div className="flex gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <BarChart2 className="mr-1 h-3 w-3" />
                        {post.views} views
                      </div>
                      <div>{post.likes} likes</div>
                      <div>{post.retweets} retweets</div>
                    </div>
                  )}
                  <div>
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      <Twitter className="mr-1 h-3 w-3" />
                      {post.status === "published" ? "View on Twitter" : "Edit scheduled post"}
                    </a>
                  </div>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-md">
                  <img src={post.image || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

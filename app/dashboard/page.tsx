import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentGenerator } from "./content-generator"
import { PostHistory } from "./post-history"
import { Analytics } from "./analytics"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-blue-500"
            >
              <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V6.5L15.5 2z" />
              <path d="M3 7.6v12.8c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h9.8" />
              <path d="M15 2v5h5" />
            </svg>
            <span className="text-xl font-bold">TweetCraft</span>
          </div>
          <nav className="ml-auto flex gap-4">
            <a href="/" className="text-sm font-medium">
              Home
            </a>
            <a href="/settings" className="text-sm font-medium">
              Settings
            </a>
            <a href="/logout" className="text-sm font-medium">
              Logout
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">Create and manage your Twitter content</p>
            </div>
            <Tabs defaultValue="create">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="create">Create Content</TabsTrigger>
                <TabsTrigger value="history">Post History</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="create" className="space-y-4">
                <ContentGenerator />
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                <PostHistory />
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <Analytics />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

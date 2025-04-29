import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ImageIcon, Twitter } from "lucide-react";
import { HomePage } from "@/components/LandingComponents/HomePage";
import { Navbar } from "@/components/LandingComponents/Navbar";
import { PricingSection } from "@/components/LandingComponents/PricingSection";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main>
        <HomePage />

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Powerful Features
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Everything you need to create engaging Twitter content
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Sparkles className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">AI-Powered Ideas</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Generate creative post ideas based on your keywords and topics
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <ImageIcon className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Image Generation</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Create stunning visuals that match your post content
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Twitter className="h-12 w-12 text-blue-500" />
                <h3 className="text-xl font-bold">Direct Posting</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Share your content directly to Twitter with one click
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Create engaging Twitter content in four simple steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-4 mt-12">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100">
                  1
                </div>
                <h3 className="text-lg font-bold">Enter Keywords</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Input topics or keywords relevant to your content
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100">
                  2
                </div>
                <h3 className="text-lg font-bold">Select an Idea</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Choose from AI-generated post ideas
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100">
                  3
                </div>
                <h3 className="text-lg font-bold">Generate Image</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Create a visual that complements your post
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100">
                  4
                </div>
                <h3 className="text-lg font-bold">Post to Twitter</h3>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  Share directly to your Twitter account
                </p>
              </div>
            </div>
          </div>
        </section>

        <PricingSection />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Twitter Content?
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of content creators who are saving time and
                  creating better content
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 TweetCraft. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-gray-500 hover:underline underline-offset-4 dark:text-gray-400"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:underline underline-offset-4 dark:text-gray-400"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:underline underline-offset-4 dark:text-gray-400"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

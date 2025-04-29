"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, RefreshCw, Twitter } from "lucide-react";
import { useContentGeneratorStore } from "@/store/useContentGenerateStore";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export function ContentGenerator() {
  const {
    keyword,
    isGeneratingIdeas,
    isGeneratingImage,
    postIdeas,
    selectedIdea,
    generatedImage,
    isPosting,
    setKeyword,
    handleGenerateIdeas,
    handleSelectIdea,
    handleGenerateImage,
    handlePostToTwitter,
    handleDownload,
    setSelectedIdea,
  } = useContentGeneratorStore();

  const { fetchUser, userAccounts, user, isLoading } = useAuthStore();

  useEffect(() => {
    fetchUser();

    if (userAccounts && userAccounts.length === 0) {
      redirect("/dashboard/profile");
    }
  }, []);

  console.log("User Accounts:", userAccounts);
  console.log("User:", user);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="keyword">Enter a topic or keyword</Label>
          <div className="flex gap-2">
            <Input
              id="keyword"
              placeholder="e.g., artificial intelligence, remote work"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              disabled={isGeneratingIdeas}
            />
            <Button
              onClick={handleGenerateIdeas}
              disabled={!keyword.trim() || isGeneratingIdeas}
            >
              {isGeneratingIdeas ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating
                </>
              ) : (
                "Generate Ideas"
              )}
            </Button>
          </div>
        </div>

        {postIdeas.length > 0 && (
          <div className="space-y-2">
            <Label>Select a post idea</Label>
            <div className="space-y-2">
              {postIdeas.map((idea) => (
                <Card
                  key={idea.id}
                  className={`cursor-pointer transition-colors ${
                    selectedIdea?.id === idea.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : ""
                  }`}
                  onClick={() => handleSelectIdea(idea)}
                >
                  <CardContent className="p-4">
                    <p>{idea.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedIdea && (
          <div className="space-y-2">
            <Label htmlFor="post-text">Edit post text</Label>
            <Textarea
              id="post-text"
              value={selectedIdea.text}
              onChange={(e) =>
                setSelectedIdea({ ...selectedIdea, text: e.target.value })
              }
              rows={3}
            />
            <Button onClick={handleGenerateImage} disabled={isGeneratingImage}>
              {isGeneratingImage ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Image
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Image
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {generatedImage && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Preview</Label>
              <Card className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <p className="text-sm">{selectedIdea?.text}</p>
                    <div className="relative aspect-video overflow-hidden rounded-md">
                      <img
                        src={generatedImage}
                        alt="Generated content"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button
              className="w-full"
              onClick={handlePostToTwitter}
              disabled={isPosting}
            >
              {isPosting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Twitter className="mr-2 h-4 w-4" />
                  Post to Twitter
                </>
              )}
            </Button>

            <div className="flex gap-2 pt-4">
              <Button onClick={() => handleDownload("png")} variant="secondary">
                Download PNG
              </Button>
              <Button
                onClick={() => handleDownload("jpeg")}
                variant="secondary"
              >
                Download JPEG
              </Button>
              <Button onClick={() => handleDownload("jpg")} variant="secondary">
                Download JPG
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

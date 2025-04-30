"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import {
  Loader2,
  RefreshCw,
  ImageIcon,
  Download,
  Sparkles,
  Send,
  X,
  Linkedin,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useContentGeneratorStore } from "@/store/useContentGenerateStore";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface SocialApp {
  name: string;
  icon: string;
  provider: string;
}

const socialApps: SocialApp[] = [
  { name: "X", icon: "/twitter.svg", provider: "twitter" },
  { name: "Linkedin", icon: "/linkedin.svg", provider: "linkedin" },
  { name: "Instagram", icon: "/instagram2.svg", provider: "instagram" },
  { name: "Threads", icon: "/threads.svg", provider: "threads" },
];

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
    fetchEnhancedText,
    isEnhancing,
    handleGenerateIdeas,
    handleSelectIdea,
    handleGenerateImage,
    handlePostToTwitter,
    handleDownload,
    setSelectedIdea,
  } = useContentGeneratorStore();

  const { fetchUser, userAccounts, user, isLoading } = useAuthStore();
  const [activeTab, setActiveTab] = useState("create");
  const [schedulePost, setSchedulePost] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotate: 0,
    blur: 0,
  });

  useEffect(() => {
    fetchUser();

    if (userAccounts && userAccounts.length === 0) {
      redirect("/dashboard/profile");
    }
  }, []);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleDownloadWithFilters = (format: string) => {
    if (!generatedImage) return;

    // Create a canvas to apply filters
    const canvas = document.createElement("canvas");
    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // Apply filters
      ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) hue-rotate(${filters.hueRotate}deg) blur(${filters.blur}px)`;
      ctx.drawImage(img, 0, 0);

      // Convert to data URL and download
      const dataUrl = canvas.toDataURL(`image/${format}`);
      const link = document.createElement("a");
      link.download = `content-image.${format}`;
      link.href = dataUrl;
      link.click();
    };

    img.src = generatedImage;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs
        defaultValue="create"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid grid-cols-2 w-[200px]">
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="create" className="space-y-6">
          <Card className="bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Post Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    id="keyword"
                    placeholder="What's on your mind? Enter a topic or keyword..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    disabled={isGeneratingIdeas}
                    className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
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
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Ideas
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {postIdeas.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    Select a post idea
                  </Label>
                  <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-2">
                    {postIdeas.map((idea) => (
                      <Card
                        key={idea.id}
                        className={cn(
                          "cursor-pointer transition-all border hover:border-neutral-400 dark:hover:border-neutral-600",
                          selectedIdea?.id === idea.id
                            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10"
                            : "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                        )}
                        onClick={() => handleSelectIdea(idea)}
                      >
                        <CardContent className="p-4">
                          <p className="text-sm">{idea.text}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {selectedIdea && (
                <div className="space-y-3">
                  <Label htmlFor="post-text" className="text-sm font-medium">
                    Edit post text
                  </Label>
                  <Textarea
                    id="post-text"
                    value={selectedIdea.text}
                    onChange={(e) =>
                      setSelectedIdea({ ...selectedIdea, text: e.target.value })
                    }
                    rows={3}
                    className="resize-none bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
                  />

                  <div className="flex gap-2">
                    <Button
                      onClick={handleGenerateImage}
                      disabled={isGeneratingImage}
                      variant="outline"
                      className="border-neutral-300 dark:border-neutral-700"
                    >
                      {isGeneratingImage ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Image
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Generate Image
                        </>
                      )}
                    </Button>

                    <Button
                      disabled={isEnhancing}
                      onClick={() => {
                        fetchEnhancedText();
                      }}
                      variant="outline"
                      className="border-neutral-300 dark:border-neutral-700"
                    >
                      <RefreshCw
                        className={isEnhancing ? "animate-spin" : ""}
                      />
                      {isEnhancing ? "Enhancing" : "Enhance idead"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Select Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                {socialApps.map((app) => (
                  <div
                    onClick={() => togglePlatform(app.provider)}
                    key={app.provider}
                    className={`flex relative items-center overflow-hidden justify-between w-full border rounded-xl p-3 hover:bg-secondary/80 transition-colors ${
                      selectedPlatforms.includes(app.provider) &&
                      "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10"
                    }`}
                  >
                    {(app.provider === "instagram" ||
                      app.provider === "threads") && (
                      <div className="absolute inset-0 bg-secondary/95 flex items-center justify-center z-10">
                        <h2 className="font-ClashDisplayMedium md:text-base text-sm">
                          Coming Soon...
                        </h2>
                        <Lock className="h-5 w-5 ml-2" />
                      </div>
                    )}
                    <div className="flex items-center space-x-4">
                      <Image
                        height={45}
                        width={45}
                        src={app.icon}
                        alt={`${app.name} logo`}
                        className={`${
                          app.provider === "twitter" ||
                          app.provider === "threads"
                            ? "dark:invert-[1]"
                            : ""
                        }`}
                      />
                      <span className="font-medium">{app.name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {selectedPlatforms.length === 0 && (
                <p className="text-sm text-neutral-500 mt-3">
                  Please select at least one platform
                </p>
              )}

              <div className="flex items-center gap-2 mt-6">
                <Switch
                  id="schedule-post"
                  checked={schedulePost}
                  onCheckedChange={setSchedulePost}
                  className="data-[state=checked]:bg-neutral-700"
                />
                <Label htmlFor="schedule-post">Schedule this post</Label>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end pt-2">
              <Button
                className="bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                disabled={selectedPlatforms.length === 0 || !selectedIdea}
                onClick={() => setActiveTab("preview")}
              >
                <Send className="mr-2 h-4 w-4" />
                Continue to Preview
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card className="bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Post Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedImage ? (
                <div className="space-y-4">
                  <Card className="overflow-hidden bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <p className="text-sm">{selectedIdea?.text}</p>
                        <div className="relative aspect-video overflow-hidden rounded-md">
                          <img
                            src={generatedImage || "/placeholder.svg"}
                            alt="Generated content"
                            className="h-full w-full object-cover"
                            style={{
                              filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) hue-rotate(${filters.hueRotate}deg) blur(${filters.blur}px)`,
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] bg-neutral-100 dark:bg-neutral-800 rounded-md">
                  <ImageIcon className="h-12 w-12 text-neutral-400 mb-2" />
                  <p className="text-neutral-500">
                    Generate an image to preview your post
                  </p>
                </div>
              )}
            </CardContent>

            {generatedImage && (
              <CardContent className="pt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Image Editor</h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="brightness" className="text-xs">
                            Brightness: {filters.brightness}%
                          </Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 text-xs px-2"
                            onClick={() =>
                              setFilters((prev) => ({
                                ...prev,
                                brightness: 100,
                              }))
                            }
                          >
                            Reset
                          </Button>
                        </div>
                        <input
                          id="brightness"
                          type="range"
                          min="0"
                          max="200"
                          value={filters.brightness}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              brightness: Number.parseInt(e.target.value),
                            }))
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="contrast" className="text-xs">
                            Contrast: {filters.contrast}%
                          </Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 text-xs px-2"
                            onClick={() =>
                              setFilters((prev) => ({ ...prev, contrast: 100 }))
                            }
                          >
                            Reset
                          </Button>
                        </div>
                        <input
                          id="contrast"
                          type="range"
                          min="0"
                          max="200"
                          value={filters.contrast}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              contrast: Number.parseInt(e.target.value),
                            }))
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="saturation" className="text-xs">
                            Saturation: {filters.saturation}%
                          </Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 text-xs px-2"
                            onClick={() =>
                              setFilters((prev) => ({
                                ...prev,
                                saturation: 100,
                              }))
                            }
                          >
                            Reset
                          </Button>
                        </div>
                        <input
                          id="saturation"
                          type="range"
                          min="0"
                          max="200"
                          value={filters.saturation}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              saturation: Number.parseInt(e.target.value),
                            }))
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="hueRotate" className="text-xs">
                            Hue Rotate: {filters.hueRotate}°
                          </Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 text-xs px-2"
                            onClick={() =>
                              setFilters((prev) => ({ ...prev, hueRotate: 0 }))
                            }
                          >
                            Reset
                          </Button>
                        </div>
                        <input
                          id="hueRotate"
                          type="range"
                          min="0"
                          max="360"
                          value={filters.hueRotate}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              hueRotate: Number.parseInt(e.target.value),
                            }))
                          }
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="blur" className="text-xs">
                            Blur: {filters.blur}px
                          </Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 text-xs px-2"
                            onClick={() =>
                              setFilters((prev) => ({ ...prev, blur: 0 }))
                            }
                          >
                            Reset
                          </Button>
                        </div>
                        <input
                          id="blur"
                          type="range"
                          min="0"
                          max="10"
                          step="0.1"
                          value={filters.blur}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              blur: Number.parseFloat(e.target.value),
                            }))
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-neutral-300 dark:border-neutral-700"
                      onClick={() =>
                        setFilters({
                          brightness: 100,
                          contrast: 100,
                          saturation: 100,
                          hueRotate: 0,
                          blur: 0,
                        })
                      }
                    >
                      Reset All
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-neutral-300 dark:border-neutral-700"
                      onClick={() =>
                        setFilters({
                          brightness: 110,
                          contrast: 110,
                          saturation: 120,
                          hueRotate: 0,
                          blur: 0,
                        })
                      }
                    >
                      Vibrant
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-neutral-300 dark:border-neutral-700"
                      onClick={() =>
                        setFilters({
                          brightness: 100,
                          contrast: 120,
                          saturation: 50,
                          hueRotate: 0,
                          blur: 0,
                        })
                      }
                    >
                      Muted
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-neutral-300 dark:border-neutral-700"
                      onClick={() =>
                        setFilters({
                          brightness: 100,
                          contrast: 100,
                          saturation: 0,
                          hueRotate: 0,
                          blur: 0,
                        })
                      }
                    >
                      B&W
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-neutral-300 dark:border-neutral-700"
                      onClick={() =>
                        setFilters({
                          brightness: 110,
                          contrast: 110,
                          saturation: 100,
                          hueRotate: 180,
                          blur: 0,
                        })
                      }
                    >
                      Cool
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-neutral-300 dark:border-neutral-700"
                      onClick={() =>
                        setFilters({
                          brightness: 110,
                          contrast: 110,
                          saturation: 120,
                          hueRotate: 330,
                          blur: 0,
                        })
                      }
                    >
                      Warm
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}

            <CardFooter className="flex flex-col gap-4">
              <Button
                className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                onClick={handlePostToTwitter}
                disabled={isPosting || !generatedImage}
              >
                {isPosting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Publish Post
                  </>
                )}
              </Button>

              {generatedImage && (
                <div className="flex gap-2 w-full">
                  <Button
                    onClick={() => handleDownloadWithFilters("png")}
                    variant="outline"
                    className="flex-1 border-neutral-300 dark:border-neutral-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PNG
                  </Button>
                  <Button
                    onClick={() => handleDownloadWithFilters("jpeg")}
                    variant="outline"
                    className="flex-1 border-neutral-300 dark:border-neutral-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    JPEG
                  </Button>
                  <Button
                    onClick={() => handleDownloadWithFilters("jpg")}
                    variant="outline"
                    className="flex-1 border-neutral-300 dark:border-neutral-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    JPG
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

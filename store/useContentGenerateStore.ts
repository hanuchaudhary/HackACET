import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface PostIdea {
  id: string;
  text: string;
}

interface ContentGeneratorState {
  keyword: string;
  isGeneratingIdeas: boolean;
  isGeneratingImage: boolean;
  postIdeas: PostIdea[];
  selectedIdea: PostIdea | null;
  generatedImage: string | null;
  isPosting: boolean;
  setKeyword: (keyword: string) => void;
  setIsGeneratingIdeas: (isGenerating: boolean) => void;
  setIsGeneratingImage: (isGenerating: boolean) => void;
  setPostIdeas: (ideas: PostIdea[]) => void;
  setSelectedIdea: (idea: PostIdea | null) => void;
  setGeneratedImage: (image: string | null) => void;
  setIsPosting: (isPosting: boolean) => void;
  handleGenerateIdeas: () => Promise<void>;
  handleSelectIdea: (idea: PostIdea) => void;
  handleGenerateImage: () => Promise<void>;
  handlePostToTwitter: () => Promise<void>;
  handleDownload: (format: "txt" | "json" | "png" | "jpeg" | "jpg") => void;

  isEnhancing: boolean;
  enhancedText: string;
  fetchEnhancedText: VoidFunction;
}

export const useContentGeneratorStore = create<ContentGeneratorState>(
  (set, get) => ({
    keyword: "",
    isGeneratingIdeas: false,
    isGeneratingImage: false,
    postIdeas: [],
    selectedIdea: null,
    generatedImage: null,
    isPosting: false,

    setKeyword: (keyword) => set({ keyword }),
    setIsGeneratingIdeas: (isGeneratingIdeas) => set({ isGeneratingIdeas }),
    setIsGeneratingImage: (isGeneratingImage) => set({ isGeneratingImage }),
    setPostIdeas: (postIdeas) => set({ postIdeas }),
    setSelectedIdea: (selectedIdea) =>
      set({ selectedIdea, generatedImage: null }),
    setGeneratedImage: (generatedImage) => set({ generatedImage }),
    setIsPosting: (isPosting) => set({ isPosting }),

    isEnhancing: false,
    enhancedText: "",
    fetchEnhancedText: async () => {
      set({ isEnhancing: true });
      try {
        const response = await axios.post(`/api/enhance`,{
          text : get().selectedIdea
        });
        const data = response.data;
        set({ setSelectedIdea: data, isEnhancing: false });
        toast.success("Idea enhanced");
      } catch (error) {
        toast.error("Failed to enhance idea");
      }
    },

    handleGenerateIdeas: async () => {
      const { keyword, setIsGeneratingIdeas, setPostIdeas } = get();
      if (!keyword.trim()) return;

      setIsGeneratingIdeas(true);
      try {
        const response = await fetch("/api/generate-ideas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword }),
        });

        const data = await response.json();
        const ideas = typeof data === "string" ? JSON.parse(data) : data;

        toast.success("Ideas generated successfully!");

        setPostIdeas(ideas);
      } catch (error) {
        console.error("Error generating ideas:", error);
      } finally {
        setIsGeneratingIdeas(false);
      }
    },

    handleSelectIdea: (idea) => {
      set({ selectedIdea: idea, generatedImage: null });
    },

    handleGenerateImage: async () => {
      const { selectedIdea, setIsGeneratingImage, setGeneratedImage } = get();
      if (!selectedIdea) return;

      try {
        setIsGeneratingImage(true);
        const res = await fetch("/api/generate-image", {
          body: JSON.stringify({ text: selectedIdea.text }),
          method: "POST",
        });
        const parsedData = await res.json();
        setGeneratedImage(parsedData.images.images[0].url);
        toast.success("Image generated successfully! Check Preview");
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setIsGeneratingImage(false);
      }
    },

    handlePostToTwitter: async () => {
      const {
        selectedIdea,
        generatedImage,
        setIsPosting,
        setKeyword,
        setPostIdeas,
        setSelectedIdea,
        setGeneratedImage,
      } = get();
      if (!selectedIdea || !generatedImage) return;

      setIsPosting(true);
      // Simulate posting to Twitter
      setTimeout(() => {
        setIsPosting(false);
        toast.success("Successfully posted to Twitter!");
        setKeyword("");
        setPostIdeas([]);
        setSelectedIdea(null);
        setGeneratedImage(null);
      }, 1500);
    },

    handleDownload: (format) => {
      const { selectedIdea, generatedImage } = get();
      if (!selectedIdea) return;

      if (generatedImage && ["png", "jpeg", "jpg"].includes(format)) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = generatedImage; // Use the actual generated image URL
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL(`image/${format}`);
            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = `image.${format}`;
            a.click();
            URL.revokeObjectURL(dataUrl);
          }
        };
        toast.success("Download Complete");
      }
    },
  })
);

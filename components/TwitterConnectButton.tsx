"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function TwitterConnectButton() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/twitter/request-token");
      const data = await response.json();
      if (data.oauth_token) {
        window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${data.oauth_token}`;
      } else {
        throw new Error("Failed to get OAuth token");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error || "Failed to connect to Twitter",
        {
          description:
            error?.response?.data?.details || "Please try again later.",
        }
      );
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        className="rounded-full"
        size={"sm"}
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Connect"
        )}
      </Button>
    </div>
  );
}

"use client";
import TwitterConnectButton from "@/components/TwitterConnectButton";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };
  

  return (
    <div>
      <Button onClick={handleLogout} variant={"destructive"}>
        Logout
      </Button>
      <TwitterConnectButton/>
    </div>
  );
}

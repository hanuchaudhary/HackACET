import ProfileContent from "@/components/Profile/ProfileContent";
import { Suspense } from "react";
import ProfileSkeleton from "@/components/Profile/ProfileSkeleton";

export default function ProfilePage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
      </div>
      
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}

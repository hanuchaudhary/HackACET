"use client";

import TwitterConnectButton from "@/components/TwitterConnectButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Edit,
  LogOut,
  Twitter,
  User,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

export default function ProfileContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { fetchUser, user, userAccounts } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDisconnect = async (providerId: string) => {
    try {
      // Call your API to disconnect the account
      // await disconnectAccount(providerId);
      console.log(`Disconnecting account: ${providerId}`);
      // Refresh user data after disconnection
      fetchUser();
    } catch (error) {
      console.error(`Failed to disconnect account ${providerId}:`, error);
    }
  };

  // Format date for display
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user?.image ? String(user.image) : "https://avatars.githubusercontent.com/u/137854084?v=4"}
                  alt={user?.name ? String(user.name) : "User"}
                />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-4 text-center sm:text-left">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{user?.name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p className="font-medium">
                    {formatDate(
                      user?.createdAt ? String(user.createdAt) : undefined
                    )}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connected Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
              Manage your connected social media accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userAccounts && userAccounts.length > 0 ? (
                userAccounts.map((account) => (
                  <div
                    key={String(account.provider)}
                    className="flex flex-col space-y-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <Twitter className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">{account.provider}</p>
                        <p className="text-sm text-muted-foreground">
                          {account.provider || account.providerAccountId}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                        Connected
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleDisconnect(account.id)}
                        className="sm:ml-2"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col space-y-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <AlertCircle className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">No accounts connected</p>
                      <p className="text-sm text-muted-foreground">
                        Connect social accounts below
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Connect a new account</h3>
                <div className="flex flex-wrap gap-2">
                  <TwitterConnectButton />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Account Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and security
            </CardDescription>
          </div>
          <Button
            onClick={handleLogout}
            variant="destructive"
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? (
              "Logging out..."
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-muted-foreground">
                  Update your password regularly for better security
                </p>
              </div>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button variant="outline" size="sm">
                Enable 2FA
              </Button>
            </div>
            <Separator />
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <p className="font-medium text-red-600">Delete Account</p>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

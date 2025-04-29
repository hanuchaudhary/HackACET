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
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Edit,
  LogOut,
  Twitter,
  User,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  const user = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    image: "/placeholder.svg?height=100&width=100",
    createdAt: "January 15, 2025",
  };

  const connectedAccounts = [
    {
      id: "twitter-1",
      provider: "twitter",
      providerAccountId: "12345678",
      username: "@janesmith",
      connected: true,
      lastUsed: "2 days ago",
    },
  ];

  const handleDisconnect = (providerId: string) => {
    console.log(`Disconnecting account: ${providerId}`);
    alert(`Account ${providerId} would be disconnected`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-shrink-0 flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <Button onClick={handleLogout} variant="destructive" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="">
        {/* Profile Information */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Card className="shadow-none border-0 ">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user.image || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-4 text-center sm:text-left">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Member since
                    </p>
                    <p className="font-medium">{user.createdAt}</p>
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
          <Card className="shadow-none border-0 ">
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                Manage your connected social media accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex flex-col space-y-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <Twitter className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Twitter</p>
                        <p className="text-sm text-muted-foreground">
                          {account.username}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                        Connected
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Last used {account.lastUsed}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(account.id)}
                        className="sm:ml-2"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col space-y-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <AlertCircle className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">No other accounts connected</p>
                      <p className="text-sm text-muted-foreground">
                        Connect additional social accounts below
                      </p>
                    </div>
                  </div>
                </div>

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
        {/* Account Settings */}
        <Card className="shadow-none border-0 ">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and security
            </CardDescription>
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
    </div>
  );
}

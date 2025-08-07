import React, { useContext, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Phone, Mail, Settings } from "lucide-react";

import { AuthContext } from "../context";

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("user");
  const { user, methods } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="bg-black text-white text-3xl font-semibold">
                      {user?.username
                        .split(" ")
                        .map((word) => word[0].toUpperCase())
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-black mb-1">
                    {user?.username}
                  </h2>
                  <p className="text-gray-600 mb-2">{user?.email}</p>
                  <Badge variant="secondary" className="bg-gray-100 text-black">
                    Verified user
                  </Badge>
                </div>

                <Separator className="my-6" />

                <nav className="space-y-2">
                  <Button
                    variant={activeTab === "user" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("user")}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Personal information
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "user" && (
              <div className="space-y-6">
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-black">
                      Personal information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-black/70">
                          User name
                        </label>
                        <div className="flex items-center mt-1">
                          <User className="h-4 w-4 mr-2 text-black/70" />
                          <p className="text-black mt-1">{user?.username}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-black/70">
                          Phone number
                        </label>
                        <div className="flex items-center mt-1">
                          <Phone className="h-4 w-4 text-black/70 mr-2" />
                          <p className="text-black">....</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-black/70">
                          Email
                        </label>
                        <div className="flex items-center mt-1">
                          <Mail className="h-4 w-4 text-black/70 mr-2" />
                          <p className="text-black">{user?.email}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-black/70">
                          Location
                        </label>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 text-black/70 mr-2" />
                          <p className="text-black">....</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className=" text-red-600">Danger zone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Write-off
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          You will be logged out of your account, but you can
                          log back in at any time.
                        </p>
                        <Button onClick={methods.logout} variant="destructive">
                          Write-off
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

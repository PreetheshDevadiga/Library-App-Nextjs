import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Camera, Edit2, BookOpen, Clock, Star } from "lucide-react";
import Image from "next/image";
import { fetchUserDetails } from "../../lib/action";
import React from "react";
import { IMember } from "../../models/member.model";

export default async function UserProfile() {
  const userProfileDetails = await fetchUserDetails();

  const userRegisteredWithCredentials: IMember | null =
    userProfileDetails?.userDetails;
  const userRegisteredWithGoogle = userProfileDetails?.user;
  const userImage = userProfileDetails?.user?.image;

  const fullName =
    `${userRegisteredWithCredentials?.firstName} ${
      userRegisteredWithCredentials?.lastName
    }` || userRegisteredWithGoogle?.name;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-[#bdc3c7] to-[#2c3e50]">
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
        <CardContent className="p-6 -mt-24">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Image
                src={userImage || "/user.png"}
                alt="Profile"
                width={160}
                height={160}
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full bg-white shadow-md"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-gray-800">
              {fullName}
            </h2>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Contact Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-800">
                  {userRegisteredWithGoogle?.email ||
                    userRegisteredWithCredentials?.email ||
                    "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-gray-800">
                  {userRegisteredWithCredentials?.phone || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-gray-800">
                  {userRegisteredWithCredentials?.address || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Library Activity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Books Borrowed
                </CardTitle>
                <BookOpen className="h-4 w-4 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-500">3 currently on loan</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Reading Hours
                </CardTitle>
                <Clock className="h-4 w-4 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48.5</div>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Favorite Genre
                </CardTitle>
                <Star className="h-4 w-4 text-indigo-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Sci-Fi</div>
                <p className="text-xs text-gray-500">
                  Based on borrowing history
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

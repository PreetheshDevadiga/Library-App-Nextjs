import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, Edit2, BookOpen, Clock, Star } from "lucide-react";
import { fetchUserDetails } from "../../lib/action";
import { IMember } from "../../models/member.model";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {getTranslations} from 'next-intl/server';

export default async function UserProfile() {
  const t= await getTranslations('viewprofile')
  const userProfileDetails = await fetchUserDetails();

  const userRegisteredWithCredentials: IMember | undefined =
    userProfileDetails?.userDetails;
  const userRegisteredWithGoogle = userProfileDetails?.user;
  const userImage = userProfileDetails?.user?.image;

  const fullName =
    `${userRegisteredWithCredentials?.firstName} ${userRegisteredWithCredentials?.lastName}` ||
    userRegisteredWithGoogle?.name;

  const path =
    userRegisteredWithCredentials?.role === "admin"
      ? "/admin/editprofile"
      : "/home/editprofile";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A2540]">
      <Card className="w-full max-w-4xl bg-[#1A1F36] text-white shadow-2xl rounded-3xl overflow-hidden border border-[#2D3348]">
        <div className="relative h-48 bg-gradient-to-r from-[#635BFF] to-[#4C45B6]">
          <Link href={path}>
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              {( t)('viewprofile')}
            </Button>
          </Link>
        </div>
        <CardContent className="p-6 -mt-24">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Image
                src={userImage || "/user.png"}
                alt="Profile"
                width={160}
                height={160}
                className="w-40 h-40 rounded-full border-4 border-[#1A1F36] shadow-lg"
              />
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full bg-[#635BFF] text-white shadow-md hover:bg-[#4C45B6]"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">
              {fullName !==undefined ? fullName : ""}
            </h2>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#A3ACBF] mb-4">
              {t('contactInfo')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-[#A3ACBF]">{t('email')}</p>
                <p className="text-white">
                  {userRegisteredWithGoogle?.email ||
                    userRegisteredWithCredentials?.email ||
                    t('noData')}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#A3ACBF]">{t('phone')}</p>
                <p className="text-white">
                  {userRegisteredWithCredentials?.phone || t('noData')}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#A3ACBF]">{t('address')}</p>
                <p className="text-white">
                  {userRegisteredWithCredentials?.address || t('noData')}
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-[#A3ACBF] mb-4">
            Library Activity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#242B42] border-[#2D3348]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#A3ACBF]">
                  Books Borrowed
                </CardTitle>
                <BookOpen className="h-4 w-4 text-[#635BFF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">12</div>
                <p className="text-xs text-[#A3ACBF]">3 currently on loan</p>
              </CardContent>
            </Card>
            <Card className="bg-[#242B42] border-[#2D3348]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#A3ACBF]">
                  Reading Hours
                </CardTitle>
                <Clock className="h-4 w-4 text-[#635BFF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">48.5</div>
                <p className="text-xs text-[#A3ACBF]">Last 30 days</p>
              </CardContent>
            </Card>
            <Card className="bg-[#242B42] border-[#2D3348]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#A3ACBF]">
                  Favorite Genre
                </CardTitle>
                <Star className="h-4 w-4 text-[#635BFF]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">Sci-Fi</div>
                <p className="text-xs text-[#A3ACBF]">
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
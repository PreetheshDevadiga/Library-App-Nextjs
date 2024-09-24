import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditProfileForm } from "./editprofileform";
import { IMember } from "../../models/member.model";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTranslations } from "next-intl"; // Import next-intl

export default function EditProfile({
  userInformation,
}: {
  userInformation: IMember | undefined;
}) {
  const t = useTranslations("EditProfileForm"); // Initialize translations

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="bg-[#0D2E4B] border-[#2D3348] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#635BFF] to-[#4C45B6] p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt={t("EditProfile.profilePictureAlt")} // Localize alt text
              />
              <AvatarFallback className="bg-[#242B42] text-white">
                {userInformation?.firstName.charAt(0)}
                {userInformation?.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {userInformation?.firstName} {userInformation?.lastName}
              </h1>
              <p className="text-gray-200">{userInformation?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-[#0D2E4B] p-6">
          <h2 className="text-xl font-semibold text-[#A3ACBF] mb-4">
            {t("EditProfile.personalInformationTitle")} {/* Localize section title */}
          </h2>
          <EditProfileForm userInformation={userInformation} />
        </CardContent>
      </Card>
    </div>
  );
}

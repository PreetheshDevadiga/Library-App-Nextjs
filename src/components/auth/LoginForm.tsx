"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useActionState } from "react";
import { authenticate } from "@/lib/action";
import { AlertCircle, BookOpen } from "lucide-react";
import { useTranslations } from 'next-intl'; 

export const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const t = useTranslations("SignInForm");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A2540]">
      <div className="w-full flex justify-center py-20">
        <Card className="w-full max-w-md border border-[#1A3550] rounded-lg shadow-2xl bg-white">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] p-3 rounded-full">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center text-[#0A2540]">
              {t("signInTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#0A2540] font-medium">{t("emailLabel")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    required
                    className="border-[#A3B8CC] focus:border-[#00D4FF] focus:ring-[#00D4FF]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#0A2540] font-medium">{t("passwordLabel")}</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="border-[#A3B8CC] focus:border-[#00D4FF] focus:ring-[#00D4FF]"
                  />
                  {errorMessage && (
                    <p className="text-red-600 text-sm flex items-center mt-2">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errorMessage}
                    </p>
                  )}
                </div>

                <Button
                  className="w-full rounded-full bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] hover:from-[#00C4EF] hover:to-[#6A63EF] text-white font-semibold py-2 px-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D4FF]"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? t("signingIn") : t("signInButton")}
                </Button>
              </div>
              <div className="text-sm text-[#4F5E74] text-center">
                <span className="mr-1">{t("noAccountMessage")}</span>
                <Link
                  className="text-[#0A2540] font-medium underline hover:underline transition-colors"
                  href="/signup"
                >
                  {t("signUpLink")}
                </Link>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full flex items-center">
              <div className="flex-grow border-t border-[#A3B8CC]" />
              <span className="px-4 bg-white text-[#4F5E74] text-sm">
                {t("orContinueWith")}
              </span>
              <div className="flex-grow border-t border-[#A3B8CC]" />
            </div>
            <div className="w-full">{children}</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

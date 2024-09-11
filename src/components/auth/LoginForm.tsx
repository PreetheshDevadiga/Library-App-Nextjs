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

export const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full flex justify-center py-20">
        <Card className="w-full max-w-md border rounded-lg shadow-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Sign in to Bookshelf
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                  <div>
                    {errorMessage && (
                      <p className="text-red-600 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errorMessage}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full rounded-md  focus:outline-none"
                  type="submit"
                >
                  Sign In
                </Button>
              </div>
              <div className="text-sm text-muted-foreground mt-3">
                <span className="mr-1 hidden sm:inline-block">
                  Dont have an account?
                </span>
                <Link
                  className="text-primary underline-offset-4 transition-colors hover:underline"
                  href="/signup"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full flex items-center">
              <div className="flex-grow border-t border-gray-300" />
              <span className="px-4 bg-background text-muted-foreground text-sm">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-300" />
            </div>
            <div className="w-full">{children}</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

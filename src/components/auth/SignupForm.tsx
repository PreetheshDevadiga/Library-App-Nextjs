"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import React, { useEffect } from "react";
import { registerUser, State } from "@/lib/action";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { useActionState } from "react"; // Assuming you have this hook

const RegisterForm = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state.message === "Success") {
      router.push("/login");
    }
  }, [state, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Join us today!</CardTitle>
          <p className="text-center">Sign up now to become a member.</p>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="space-y-2">
              <div className="flex flex-row gap-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" placeholder="John" required />
                  {state.errors?.firstName && (
                    <p className="text-red-500 text-sm">{state.errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" placeholder="Doe" required />
                  {state.errors?.lastName && (
                    <p className="text-red-500 text-sm">{state.errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="9087654321" required type="phone" />
                {state.errors?.phone && (
                  <p className="text-red-500 text-sm">{state.errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="john@example.com" required type="email" />
                {state.errors?.email && (
                  <p className="text-red-500 text-sm">{state.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" required type="password" />
                {state.errors?.password && (
                  <p className="text-red-500 text-sm">{state.errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" name="confirmPassword" required type="password" />
                {state.errors?.confirmPassword && (
                  <p className="text-red-500 text-sm">{state.errors.confirmPassword}</p>
                )}
              </div>

              {state.message && state.message !== "Success" && (
                <p className="text-red-600 text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {state.message}
                </p>
              )}

              <Button className="w-full rounded-md focus:outline-none focus:ring-2" type="submit">
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <div className="flex flex-col justify-center text-center gap-2">
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300" />
              <span className="px-2 bg-white text-gray-500 text-sm">Or continue with</span>
              <div className="flex-grow border-t border-gray-300" />
            </div>
            {children}
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link className="font-medium text-primary hover:underline" href="/login">
                Log in
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;



//TODO: pre-populate the user eneterd values
//Todo: password-confir password error. display proper error message.

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
import { useActionState } from "react";
import { toast } from "@/components/use-toast";

const RegisterForm = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const initialState: State = { message: "", errors: {} };
  const [state, formAction] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state.message === "Success") {
      toast({
        title: "Sign Up Successful",
        description: "Welcome! You have successfully registered.",
        className: "bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-white",
        duration: 2000,
      });
      router.push("/login");
    } else if (state.message && state.message !== "Success") {
      toast({
        title: "Sign Up Failed",
        description: "There was an error during registration. Please try again.",
        className: "bg-red-500 text-white",
        duration: 3000,
      });
    }
  }, [state, router]);

  const handleFormData = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formAction(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A2540]">
      <Card className="w-full max-w-md shadow-2xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#0A2540]">Join us today!</CardTitle>
          <p className="text-center text-[#4F5E74]">Sign up now to become a member.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormData} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[#0A2540]">First Name</Label>
                <Input id="firstName" name="firstName" placeholder="John" required className="border-[#A3B8CC] focus:border-[#00D4FF] focus:ring-[#00D4FF]" />
                {state.errors?.firstName && (
                  <p className="text-red-500 text-sm">{state.errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[#0A2540]">Last Name</Label>
                <Input id="lastName" name="lastName" placeholder="Doe" required className="border-[#A3B8CC] focus:border-[#00D4FF] focus:ring-[#00D4FF]" />
                {state.errors?.lastName && (
                  <p className="text-red-500 text-sm">{state.errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#0A2540]">Phone</Label>
              <Input id="phone" name="phone" placeholder="9087654321" required type="tel" className="border-[#A3B8CC] focus:border-[#00D4FF] focus:ring-[#00D4FF]" />
              {state.errors?.phone && (
                <p className="text-red-500 text-sm">{state.errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#0A2540]">Email</Label>
              <Input id="email" name="email" placeholder="john@example.com" required type="email" className="border-[#A3B8CC] focus:border-[#00D4FF] focus:ring-[#00D4FF]" />
              {state.errors?.email && (
                <p className="text-red-500 text-sm">{state.errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#0A2540]">Password</Label>
              <Input id="password" name="password" required type="password" className="border-[#A3B8CC] focus:border-[#00D4FF] focus:ring-[#00D4FF]" />
              {state.errors?.password && (
                <p className="text-red-500 text-sm">{state.errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#0A2540]">Confirm Password</Label>
              <Input id="confirmPassword" name="confirmPassword" required type="password" className="border-[#A3B8CC] focus:border-[#00D4FF] focus:ring-[#00D4FF]" />
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

            <Button className="w-full rounded-full bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] hover:from-[#00C4EF] hover:to-[#6A63EF] text-white font-semibold py-2 px-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D4FF]" type="submit">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <div className="flex flex-col justify-center text-center gap-4 w-full">
            <div className="flex items-center">
              <div className="flex-grow border-t border-[#A3B8CC]" />
              <span className="px-4 bg-white text-[#4F5E74] text-sm">Or continue with</span>
              <div className="flex-grow border-t border-[#A3B8CC]" />
            </div>
            {children}
            <p className="text-sm text-[#4F5E74]">
              Already have an account?
              <Link className="font-medium text-[#0A2540] underline hover:underline" href="/login">
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
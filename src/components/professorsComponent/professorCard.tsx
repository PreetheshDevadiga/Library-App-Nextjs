"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { User, Briefcase, BookOpen, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RefreshProfessor from "../admin/appointments/refreshButton";
import BookAppointment from "../payments/razorpay";
import DeleteProfessor from "../../components/admin/appointments/deleteProfessor";

interface ProfessorCardProps {
  id: number;
  name: string;
  department: string;
  bio: string;
  email: string;
  status: string;
  userName: string;
  userEmail: string;
  userContact: number;
}

const ProfessorCard: React.FC<ProfessorCardProps> = ({
  id,
  name,
  department,
  bio,
  email,
  status,
  userContact,
  userEmail,
  userName,
}) => {
  const path = usePathname();

  const isHomeRoute = path.includes("/home");

  return (
    <Card className="bg-[#0D2E4B] text-white border border-[#1A3550] overflow-hidden transition-all duration-300  flex flex-col h-full">
      <CardHeader className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] p-4">
        <CardTitle className="text-xl font-bold text-[#0A2540] flex items-center space-x-2">
          <User className="w-6 h-6" />
          <span>Prof. {name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4 flex-grow">
        <div className="text-[#A3B8CC] flex items-center gap-2">
          <Briefcase className="w-5 h-5 flex-shrink-0" />
          <span>{department}</span>
        </div>
        <div className="text-[#A3B8CC]">
          <p className="text-sm">{bio}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-[#0A2540] flex gap-2 justify-between items-center">
        <BookAppointment id={id} path={path} isHomeRoute={isHomeRoute} userContact={userContact} userEmail={userEmail} userName={userName}/>
        <RefreshProfessor professorEmail={email} status={status} />
        {/* <DeleteProfessor id={id} name={name} /> */}
      </CardFooter>
      
    </Card>
  );
};

export default ProfessorCard;

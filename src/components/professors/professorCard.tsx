import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { User, Briefcase, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface ProfessorCardProps {
    id:number;
  name: string;
  department: string;
  bio: string;
}

const ProfessorCard: React.FC<ProfessorCardProps> = ({ id,name, department, bio}) => {
  return (
    <Card className="bg-[#0D2E4B] text-white border border-[#1A3550] overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
      <CardHeader className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] p-4">
        <CardTitle className="text-xl font-bold text-[#0A2540] flex items-center space-x-2">
          <User className="w-6 h-6" />
          <span>{name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center space-x-2 text-[#A3B8CC]">
          <Briefcase className="w-5 h-5" />
          <span>{department}</span>
        </div>
        <div className="flex items-center space-x-2 text-[#A3B8CC]">
          <p className="text-sm text-[#A3B8CC]">{bio}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-[#0A2540]">
        <Link href={`/home/professors/${id}/calendly`}>
        <Button 
          className="w-full bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540] hover:from-[#00C4EF] hover:to-[#6A63EF] transition-all duration-300 font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl"
        >
          Book Appointment
        </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProfessorCard;
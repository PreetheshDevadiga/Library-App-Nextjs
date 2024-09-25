"use client";

import React from "react";
import { Button } from "../ui/button";
import { cancelAppointments } from "../../lib/action";
import { useToast } from "../use-toast";
import { useRouter } from "next/navigation";
import { X } from 'lucide-react';

type CancelAppointmentProps = {
  uuid: string;
};

export default function CancelAppointment({ uuid }: CancelAppointmentProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleCancel = async (e: React.MouseEvent) => {
    try {
      const data = await cancelAppointments(uuid);
      if (data) {
        toast({
          title: "Appointment Cancelled",
          description: "Your appointment has been successfully cancelled.",
          duration: 3000,
          className: "bg-[#0D2E4B] border-[#00D4FF] text-white",
        });
      }
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel the appointment. Please try again.",
        duration: 3000,
        className: "bg-[#0D2E4B] border-[#FF4136] text-white",
      });
    }
  };

  return (
    <Button
      onClick={handleCancel}
      className="bg-gradient-to-r from-[#FF4136] to-[#FF851B] hover:from-[#E03126] hover:to-[#EF750B] text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
    >
      <X className="w-4 h-4" />
      <span>Cancel Appointment</span>
    </Button>
  );
}
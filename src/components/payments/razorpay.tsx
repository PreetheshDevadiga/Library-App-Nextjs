"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { performPayment } from "../../lib/action";
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface BookAppointmentProps {
  id: number;
  path: string;
  isHomeRoute: boolean;
  userName:string;
  userEmail:string;
  userContact:number;
}

export default function BookAppointment({ id, path, isHomeRoute ,userContact,userEmail,userName}: BookAppointmentProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [appointmentLink, setAppointmentLink] = useState('');
console.log(userContact,userEmail,userName);
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          resolve();
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    const orderRes = await performPayment(500);
    const orderId = orderRes?.orderId;

    if (!orderId) {
      console.log("No orderId");
      alert("No order");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 500 * 100,
      currency: "INR",
      name: "Library Management System",
      description: "Appointment Booking Fee",
      order_id: orderId,
      handler: function (response: any) {
        setShowSuccessDialog(true);
        setAppointmentLink(`${path}/${id}/calendly`);
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: userContact?userContact:"9999999999",
      },
      theme: {
        color: "#00D4FF",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  const handleBookAppointment = () => {
    setShowConfirmDialog(true);
  };

  return (
    <>
      {isHomeRoute && (
        <Button 
          onClick={handleBookAppointment}
          className="w-full bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540] hover:from-[#00C4EF] hover:to-[#6A63EF] transition-all duration-300 font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl"
        >
          Book Appointment
        </Button>
      )}

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="bg-[#0D2E4B] text-white border border-[#1A3550]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7A73FF]">Confirm Appointment Booking</DialogTitle>
            <DialogDescription className="text-[#A3B8CC]">
              You are about to book an appointment. The booking fee is ₹500.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
            <Button
              onClick={() => setShowConfirmDialog(false)}
              variant="outline"
              className="border-[#1A3550] text-[#A3B8CC] hover:bg-[#1A3550] transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540] hover:from-[#00C4EF] hover:to-[#6A63EF] transition-all duration-300 font-semibold"
            >
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-[#0D2E4B] text-white border border-[#1A3550]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7A73FF]">Payment Successful</DialogTitle>
            <DialogDescription className="text-[#A3B8CC]">
              Your payment has been processed successfully. You can now book your appointment.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link href={appointmentLink}>
              <Button
                className="w-full bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540] hover:from-[#00C4EF] hover:to-[#6A63EF] transition-all duration-300 font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl"
              >
                Book Appointment
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
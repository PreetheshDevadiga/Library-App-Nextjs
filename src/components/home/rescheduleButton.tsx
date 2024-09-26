import React from "react";
import { Button } from "../ui/button";
import { useToast } from "../use-toast";
import { useRouter } from "next/navigation";
import  Link  from 'next/link'

export function RescheduleAppointment({rescheduleLink}:{rescheduleLink:string}){
    const encodedUrl = encodeURIComponent(rescheduleLink);

    return (
        <Link href={`/home/myAppointments/Reschedule?url=${encodedUrl}`}>
        <Button  className="bg-green-500">
            Reschedule
        </Button>
        </Link>
    )
}
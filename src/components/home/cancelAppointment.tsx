import React from "react";
import { Button } from "../ui/button";
import { cancelAppointments } from "../../lib/action.ts"
import { useToast } from "../use-toast";
import { useRouter } from "next/navigation";

type CancelAppointmentProps={
    uuid:string;
}

export default function CancelAppointment({uuid}: CancelAppointmentProps){
    const { toast } = useToast();
    const router=useRouter();

    const handleCancel = async (e:React.MouseEvent)=>{
        const data= await cancelAppointments(uuid);
        if (data) {
            toast({
              title: "Success",
              description: "Appointment cancelled successfully from the library.",
              duration: 1500,
              className: "bg-green-100 border-green-500 text-green-800 shadow-lg",
            });
          }
          router.refresh();
    }
    return(
        <Button variant="destructive" onClick={handleCancel}>
            Cancel
        </Button>
    )

}
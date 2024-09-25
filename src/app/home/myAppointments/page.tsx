import React from 'react';
import AppointmentsList from "../../../components/home/AppointmentsList"
import { getInviteeDetails,getUserAppointments } from "../../../lib/action"


export default async function MyAppointmentsPage() {

    const values = await getUserAppointments()
 
    console.log("values",values);
    

  return (
    <div className="bg-[#0A2540] min-h-screen">
      <AppointmentsList 
        appointments={values!}
      />
    </div>
  );
};

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, Clock, User, Briefcase, Mail, Video } from 'lucide-react';

import CancelAppointment  from "./cancelAppointment"

interface Appointment {
  startTime: string;
  endTime: string;
  gmeetLink: string;
  professorEmail: string;
  name: string;
  email: string;
  profname: string;
  profdept: string;
  event_uuid:string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ appointments }) => {
  
  return (
    <div className="min-h-screen bg-[#0A2540] p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7A73FF]">
        My Appointments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.email} className="bg-[#0D2E4B] border-[#1A3550] rounded-lg text-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] p-4">
              <CardTitle className="text-xl font-bold text-[#0A2540] flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Prof. {appointment.profname}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center space-x-2 text-[#A3B8CC]">
                <Calendar className="w-5 h-5" />
                <span>{appointment.startTime.split(',')[0]}, {appointment.startTime.split(',')[1]}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#A3B8CC]">
                <Clock className="w-5 h-5" />
                <span>{appointment.startTime.split(',')[2]} - {appointment.endTime.split(',')[2]}</span>
              </div>
              <div className="flex items-center space-x-2 text-[#A3B8CC]">
                <Briefcase className="w-5 h-5" />
                <span>{appointment.profdept}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-[#0A2540] rounded-b-lg">
              <Button 
                className="w-full bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540] hover:from-[#00C4EF] hover:to-[#6A63EF] transition-all duration-300 font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Video className="w-5 h-5" />
                <a href={appointment.gmeetLink} >Join Google Meet</a>
              </Button>

              <CancelAppointment uuid={appointment.event_uuid}/>
              
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;
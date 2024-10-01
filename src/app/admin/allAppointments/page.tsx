import React from "react";
import { getAllProfessorsAppointments } from "../../../lib/action";
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";

export default async function AllAppointments() {
  const allAppointments = await getAllProfessorsAppointments();

  return (
    <div className="container mx-auto px-4 py-8 bg-[#0A2540]">
      <Card className="bg-[#1A1F36] border-[#2D3348] shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold text-white">All Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          {allAppointments && allAppointments.length > 0 ? (
            <div className="rounded-md overflow-hidden">
              <Table className="w-full border-collapse">
                <TableHeader>
                  <TableRow className="border-b border-[#2D3348] hover:bg-[#242B42] transition-colors duration-200">
                    <TableHead className="text-[#A3ACBF]">Professor</TableHead>
                    <TableHead className="text-[#A3ACBF]">Student</TableHead>
                    <TableHead className="text-[#A3ACBF]">Date</TableHead>
                    <TableHead className="text-[#A3ACBF]">Time</TableHead>
                    <TableHead className="text-[#A3ACBF]">Department</TableHead>
                    <TableHead className="text-[#A3ACBF]">Professor Email</TableHead>
                    <TableHead className="text-[#A3ACBF]">Student Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allAppointments.map((appointment) => (
                    <TableRow
                      key={appointment.event_uuid}
                      className="border-b border-[#2D3348] hover:bg-[#242B42] transition-colors duration-200"
                    >
                      <TableCell className="text-white">{appointment.profname}</TableCell>
                      <TableCell className="text-white">{appointment.name}</TableCell>
                      <TableCell className="text-white">
                        {appointment.startTime.split(',').slice(0, 2).join(',')}
                      </TableCell>
                      <TableCell className="text-white">
                        {`${appointment.startTime.split(',')[2]} - ${appointment.endTime.split(',')[2]}`}
                      </TableCell>
                      <TableCell className="text-white">{appointment.profdept}</TableCell>
                      <TableCell className="text-white">{appointment.professorEmail}</TableCell>
                      <TableCell className="text-white">{appointment.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center p-8">
              <AlertCircle className="w-16 h-16 text-[#FF4136] mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">No Appointments Available</h2>
              <p className="text-[#A3ACBF]">There are currently no scheduled appointments.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <footer className="mt-12 text-center text-[#A3ACBF]">
        <p>Need help? Contact support at support@example.com</p>
      </footer>
    </div>
  );
}

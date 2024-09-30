'use client'

import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Button } from "../../../components/ui/button"
import { Calendar, Clock, User, Briefcase, Mail, Video } from 'lucide-react'

type AppointmentProps = {
  event_uuid: string
  profname: string
  status: string
  name: string
  email: string
  startTime: string
  endTime: string
  profdept: string
  professorEmail: string
  gmeetLink: string
}

export default function AppointmentsTable({ appointments }: { appointments: AppointmentProps[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full border-collapse">
        <TableHeader className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF]">
          <TableRow>
            <TableHead className="text-[#0A2540] font-bold">Professor</TableHead>
            <TableHead className="text-[#0A2540] font-bold">Student</TableHead>
            <TableHead className="text-[#0A2540] font-bold">Date</TableHead>
            <TableHead className="text-[#0A2540] font-bold">Time</TableHead>
            <TableHead className="text-[#0A2540] font-bold">Department</TableHead>
            <TableHead className="text-[#0A2540] font-bold">Professor Email</TableHead>
            <TableHead className="text-[#0A2540] font-bold">Student Email</TableHead>
            {/* <TableHead className="text-[#0A2540] font-bold">Join</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <AppointmentRow key={appointment.event_uuid} {...appointment} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function AppointmentRow(props: AppointmentProps) {
  return (
    <TableRow className="bg-[#0D2E4B] border-b border-[#1A3550] hover:bg-[#1A3550] transition-colors">
      <TableCell className="font-medium text-white">
          <span>{props.profname}</span>
      </TableCell>
      <TableCell className="text-white">
        
          <span>{props.name}</span>

      </TableCell>
      <TableCell className="text-white">
          <span>{props.startTime.split(',').slice(0, 2).join(',')}</span>

      </TableCell>
      <TableCell className="text-white">
        
          <span>{`${props.startTime.split(',')[2]} - ${props.endTime.split(',')[2]}`}</span>

      </TableCell>
      <TableCell className="text-white">
        
          <span>{props.profdept}</span>

      </TableCell>
      <TableCell className="text-white">
       
          <span>{props.professorEmail}</span>

      </TableCell>
      <TableCell className="text-white">
        
          <span>{props.email}</span>

      </TableCell>
      {/* <TableCell>
        <Button
          size="sm"
          className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-[#0A2540] hover:from-[#00C4EF] hover:to-[#6A63EF]"
          onClick={() => window.open(props.gmeetLink, '_blank')}
        >
          <Video className="w-4 h-4 mr-2" />
          Join
        </Button>
      </TableCell> */}
    </TableRow>
  )
}
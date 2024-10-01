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
    <div className="w-full overflow-x-auto bg-[#0A2540] p-6 rounded-2xl shadow-2xl">
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow className="border-b border-[#1A3550]">
            <TableHead className="text-[#635BFF] font-bold py-4">Professor</TableHead>
            <TableHead className="text-[#635BFF] font-bold py-4">Student</TableHead>
            <TableHead className="text-[#635BFF] font-bold py-4">Date</TableHead>
            <TableHead className="text-[#635BFF] font-bold py-4">Time</TableHead>
            <TableHead className="text-[#635BFF] font-bold py-4">Department</TableHead>
            <TableHead className="text-[#635BFF] font-bold py-4">Professor Email</TableHead>
            <TableHead className="text-[#635BFF] font-bold py-4">Student Email</TableHead>
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
    <TableRow className="bg-gradient-to-r from-[#0D2E4B] to-[#1A3550] border-b border-[#1A3550] hover:from-[#1A3550] hover:to-[#0D2E4B] transition-all duration-300 rounded-xl my-2">
      <TableCell className="font-medium text-white py-4 px-6">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-[#635BFF]" />
          <span>{props.profname}</span>
        </div>
      </TableCell>
      <TableCell className="text-white py-4 px-6">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-[#635BFF]" />
          <span>{props.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-white py-4 px-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-[#635BFF]" />
          <span>{props.startTime.split(',').slice(0, 2).join(',')}</span>
        </div>
      </TableCell>
      <TableCell className="text-white py-4 px-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-[#635BFF]" />
          <span>{`${props.startTime.split(',')[2]} - ${props.endTime.split(',')[2]}`}</span>
        </div>
      </TableCell>
      <TableCell className="text-white py-4 px-6">
        <div className="flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-[#635BFF]" />
          <span>{props.profdept}</span>
        </div>
      </TableCell>
      <TableCell className="text-white py-4 px-6">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-[#635BFF]" />
          <span>{props.professorEmail}</span>
        </div>
      </TableCell>
      <TableCell className="text-white py-4 px-6">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-[#635BFF]" />
          <span>{props.email}</span>
        </div>
      </TableCell>
    </TableRow>
  )
}
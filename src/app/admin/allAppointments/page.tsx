import React from "react"
import { getAllProfessorsAppointments } from "../../../lib/action"
import AppointmentsTable from "../../../components/admin/appointments/appointmentsCard"
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"

export default async function AllAppointments() {
  const allAppointments = await getAllProfessorsAppointments()

  return (
    <div className="min-h-screen bg-[#0A2540] p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7A73FF]">
            All Appointments
          </h1>
          <p className="mt-4 text-center text-[#A3B8CC] text-lg">
            View and manage all scheduled appointments
          </p>
        </header>

        {allAppointments && allAppointments.length > 0 ? (
          <Card className="bg-[#0D2E4B] border-[#1A3550]">
    
            <CardContent>
              <AppointmentsTable appointments={allAppointments} />
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-[#0D2E4B] border-[#1A3550] text-center p-8">
            <CardContent>
              <AlertCircle className="w-16 h-16 text-[#FF4136] mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">No Appointments Available</h2>
              <p className="text-[#A3B8CC]">There are currently no scheduled appointments.</p>
            </CardContent>
          </Card>
        )}

        <footer className="mt-12 text-center text-[#A3B8CC]">
          <p>Need help? Contact support at support@example.com</p>
        </footer>
      </div>
    </div>
  )
}
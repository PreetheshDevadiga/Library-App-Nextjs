import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import React from "react"

export default function EditProfile() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-t-lg">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-2 border-white">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Profile picture" />
            <AvatarFallback>PD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-white">Preethesh Devadiga</h1>
            <p className="text-orange-100">preethesh@example.com</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-b-lg shadow-md">
        <h2 className="text-xl font-semibold text-orange-600 mb-4">Personal Information</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-orange-600">First Name</Label>
              <Input 
                id="firstName" 
                defaultValue="Preethesh" 
                className="bg-gradient-to-r from-gray-100 to-gray-200 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-orange-600">Last Name</Label>
              <Input 
                id="lastName" 
                defaultValue="Devadiga" 
                className="bg-gradient-to-r from-gray-100 to-gray-200 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-orange-600">Phone Number</Label>
              <Input 
                id="phoneNumber" 
                defaultValue="6360505931" 
                className="bg-gradient-to-r from-gray-100 to-gray-200 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-orange-600">Email</Label>
              <Input 
                id="email" 
                defaultValue="preethesh@example.com" 
                className="bg-gradient-to-r from-gray-100 to-gray-200 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-orange-600">Address</Label>
            <Textarea 
              id="address" 
              defaultValue="5-57 near chithrapura temple kulai" 
              className="bg-gradient-to-r from-gray-100 to-gray-200 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}
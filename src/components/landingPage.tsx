import React from 'react'
import { Button } from "./ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightFromLine } from 'lucide-react'

export default function LandingPage() {
  return (

    <div className="bg-gray-200 min-h-screen w-full">
        <nav className="bg-gray-200 text-black p-4">
        <h1 className="text-6xl font-bold pl-10">
            My <span className="text-orange-600">Book</span><br /> Shelf
          </h1>
        </nav>
      <main className="max-w-6xl mx-auto  flex items-center justify-between">
        <div className="max-w-lg">
          <h1 className="text-6xl  leading-tight text-[#3A4031]">
            Your Story,
            <br />
            Your Book,
            <br />
            Your Legacy
          </h1>
          <p className="mt-6 text-lg text-[#3A4031]">
          Explore stories that connect you with the world. Build a legacy through the books that inspire and move you. </p>
          
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg  py-3 text-sm font-medium text-white"
          >
            <Button className="text-white">
            Get Started <ArrowRightFromLine className="w-5 md:w-6" />
            </Button> 
          </Link>
         
        </div>
        <div className="relative w-96 h-96">
          <Image
            src="/stack-of-books.png"
            alt="Stack of books"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </main>
    </div>
  )
}
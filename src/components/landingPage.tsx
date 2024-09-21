import { Button } from "@/components/ui/button";
import { BookOpen, Users, Calendar, BookMarked } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A2540] text-white font-sans">
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-[#00D4FF] p-2 rounded-lg">
            <BookOpen className="h-8 w-8 text-[#0A2540] " />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">BookShelf</h1>
        </div>
      </header>

      <main>
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-transparent bg-clip-text">
              Your Digital BookShelf
            </h1>
            <p className="text-xl text-[#A3B8CC] mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover the joy of effortless library management with our
              intuitive system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="text-lg bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] hover:from-[#00C4EF] hover:to-[#6A63EF] text-[#0A2540] font-semibold transition-all duration-300 shadow-lg hover:shadow-xl rounded-full px-10 py-4"
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  className="text-lg bg-[#1A3550] hover:bg-[#254360] text-white transition-all duration-300 shadow-lg hover:shadow-xl rounded-full px-10 py-4"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-20 bg-[#0D2E4B]">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-transparent bg-clip-text">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              <FeatureCard
                icon={<BookMarked className="h-10 w-10 text-[#00D4FF]" />}
                title="Efficient Cataloging"
                description="Easily organize and categorize your entire book collection with our intuitive system."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-[#7A73FF]" />}
                title="User-Friendly Interface"
                description="Manage library members and their activities with our sleek, easy-to-use dashboard."
              />
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-[#00D4FF]" />}
                title="Smart Reservations"
                description="Streamline book reservations and due date management with automated reminders."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0A2540] py-12 border-t border-[#1A3550]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="bg-[#00D4FF] p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-[#0A2540]" />
              </div>
              <h1 className="text-xl font-semibold text-white">BookShelf</h1>
            </div>
            <nav className="flex flex-wrap justify-center gap-8">
              <Link
                href="#"
                className="text-[#A3B8CC] hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-[#A3B8CC] hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-[#A3B8CC] hover:text-white transition-colors duration-300"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="mt-10 text-center text-[#A3B8CC]">
            © 2024 BookShelf. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-[#0A2540] px-8 py-10 rounded-2xl shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px] border border-[#1A3550]">
      <div className="bg-[#0D2E4B] p-4 rounded-full shadow-inner inline-block mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-[#A3B8CC] leading-relaxed">{description}</p>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Calendar, BookMarked } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 font-sans">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-gray-300" />
          <span className="text-3xl font-bold text-gray-100">BookShelf</span>
        </div>
        <Link href="/login">
          <Button className="bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300">
            Sign In
          </Button>
        </Link>
      </header>

      <main className="bg-gray-800">
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-6">
              Your Digital BookShelf
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Organize, discover, and enjoy your library collection with our
              intuitive management system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/login">
                <Button
                  size="lg"
                  className="text-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-300"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16 border-t border-gray-700">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-100 mb-12 text-center">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<BookMarked className="h-12 w-12 text-gray-300" />}
                title="Efficient Cataloging"
                description="Easily organize and categorize your entire book collection with our intuitive system."
              />
              <FeatureCard
                icon={<Users className="h-12 w-12 text-gray-300" />}
                title="User-Friendly Interface"
                description="Manage library members and their activities with our sleek, easy-to-use dashboard."
              />
              <FeatureCard
                icon={<Calendar className="h-12 w-12 text-gray-300" />}
                title="Smart Reservations"
                description="Streamline book reservations and due date management with automated reminders."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-gray-300" />
              <span className="text-xl font-semibold text-gray-100">
                BookShelf
              </span>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-gray-500">
            © 2023 BookShelf. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
}
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:translate-y-[-4px]">
      <div className="inline-block p-4 bg-gray-600 rounded-full mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-gray-100 mb-4">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}

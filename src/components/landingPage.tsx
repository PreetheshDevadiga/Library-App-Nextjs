import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useTranslations } from 'next-intl';
import  Link  from 'next/link'
import LocaleSwitcher  from "@/components/LocaleSwitcher";

export default function LandingPage() {
  const t = useTranslations('LandingPage');

  return (
    <div className="min-h-screen bg-[#0A2540] text-white font-sans">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] p-2 rounded-lg">
            <BookOpen className="h-8 w-8 text-[#0A2540]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-transparent bg-clip-text">{t('header.title')}</span>
          </h1>
        </div>
        <LocaleSwitcher />
      </header>

      <main className="bg-[#0A2540]">
        <section className="pt-5 pb-8">
          <div className="container mx-auto px-4 text-center items-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] leading-relaxed text-transparent bg-clip-text inline-block">{t('main.hero.headline')}</span>
            </h2>
            <p className="text-xl text-[#A3B8CC] mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('main.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="text-lg bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] hover:from-[#00C4EF] hover:to-[#6A63EF] text-[#0A2540] transition-all duration-300 shadow-lg hover:shadow-xl rounded-full"
                >
                  {t('main.hero.signUp')}
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  className="text-lg bg-[#1A3550] hover:bg-[#254360] text-white transition-all duration-300 shadow-lg hover:shadow-xl rounded-full px-10"
                >
                  {t('main.hero.login')}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="pt-8 pb-5 border-t border-[#1A3550]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-transparent leading-relaxed bg-clip-text inline-block">{t('main.features.headline')}</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title={t('main.features.feature1.title')}
                description={t('main.features.feature1.description')}
              />
              <FeatureCard
                title={t('main.features.feature2.title')}
                description={t('main.features.feature2.description')}
              />
              <FeatureCard
                title={t('main.features.feature3.title')}
                description={t('main.features.feature3.description')}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0D2E4B] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-[#0A2540]" />
              </div>
              <h1 className="text-xl font-semibold">
                <span className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-transparent bg-clip-text">{t('footer.title')}</span>
              </h1>
            </div>
            <nav className="flex flex-wrap justify-center gap-6">
              <Link
                href="#"
                className="text-[#A3B8CC] hover:text-white transition-colors duration-300"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link
                href="#"
                className="text-[#A3B8CC] hover:text-white transition-colors duration-300"
              >
                {t('footer.termsOfService')}
              </Link>
              <Link
                href="#"
                className="text-[#A3B8CC] hover:text-white transition-colors duration-300"
              >
                {t('footer.contact')}
              </Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-[#A3B8CC]">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-[#0D2E4B] px-8 py-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] border border-[#1A3550]">
      <h3 className="text-2xl font-semibold mb-4">
        <span className="bg-gradient-to-r from-[#00D4FF] to-[#7A73FF] text-transparent bg-clip-text">{title}</span>
      </h3>
      <p className="text-[#A3B8CC] leading-relaxed">{description}</p>
    </div>
  );
}

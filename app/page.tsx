import HeroSection from '@/components/Hero/HeroSection';
import ServicesSection from '@/components/Services/ServicesSection';
import PortfolioSection from '@/components/Portfolio/PortfolioSection';
import TeamSection from '@/components/Team/TeamSection';
import ContactSection from '@/components/Contact/ContactSection';
import FAQSection from '@/components/FAQ/FAQSection';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TeamSection />
      <ContactSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
import CalendarOverview from '@/components/CalendarOverview';
import CTA from '@/components/cta';
import DetailedHome from '@/components/detailedhome';
import GovernorsSection from '@/components/GovernorsSection';
import Hero from '@/components/Hero';
import HeroSection from '@/components/HeroSection';
import OverlayCTA from '@/components/overlayCTA';
import Stats from '@/components/stats';
import Testimonial from '@/components/testimonial';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <GovernorsSection />
      <CalendarOverview />
      <Stats />
      <CTA />
      <OverlayCTA />
      <DetailedHome />
      <Testimonial />
    </div>
  );
}

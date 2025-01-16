import CTA from '@/components/cta';
import DetailedHome from '@/components/detailedhome';
import Hero from '@/components/Hero';
import HeroSection from '@/components/HeroSection';
import OverlayCTA from '@/components/overlayCTA';
import Stats from '@/components/stats';
import Testimonial from '@/components/testimonial';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Hero />
      <Stats />
      <CTA />
      <OverlayCTA />
      <DetailedHome />
      <Testimonial />
    </div>
  );
}

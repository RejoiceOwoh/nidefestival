import CTA from '@/components/cta';
import DetailedHome from '@/components/detailedhome';
import Discount from '@/components/discountSection';
import Hero from '@/components/Hero';
import OverlayCTA from '@/components/overlayCTA';
import Stats from '@/components/stats';
import Testimonial from '@/components/testimonial';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <CTA />
      <OverlayCTA />
      <DetailedHome />
      <Testimonial />
    </div>
  );
}

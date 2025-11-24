import { HeroSection } from "@/components/sections/HeroSection";
import { AreasGrid } from "@/components/sections/AreasGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AreasGrid />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
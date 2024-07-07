"use client";
import {
  AboutMe,
  Contact,
  Features,
  Footer,
  Hero,
  HomeNav,
  Testimonial,
} from "@/components/Home/index";

export default function Home() {
  return (
    <div className="bg-background flex flex-col  items-center h-[100svh] overflow-y-scroll">
      <Hero />
      <Features />
      <Testimonial />
      <AboutMe />
      {/* <Contact /> */}
      <Footer />
    </div>
  );
}

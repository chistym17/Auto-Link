"use client"
import { Appbar } from "../components/Appbar";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/howworks";
import { GetStartedSection } from "../components/getstarted";
import { Footer } from "../components/Footer";
import { AvailableZaps } from "../components/availablezaps";
import { ReviewSection } from "../components/reviews";
export default function Home() {

  
  return (
    <main className="">
        <Appbar />
        <Hero />
        <HowItWorks></HowItWorks>
        <GetStartedSection></GetStartedSection>    
        <AvailableZaps></AvailableZaps>
        <ReviewSection></ReviewSection>
        <Footer></Footer>
    </main>
  );
}

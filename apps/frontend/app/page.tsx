"use client"
import { Appbar } from "../components/Appbar";
import { Hero } from "../components/Hero";
import { HeroVideo } from "../components/HeroVideo";
import { useSession } from "next-auth/react";
import CreateZapButton from "../components/zapbtn"
import WebhookTester from "../components/testurl"
import Webhookform from "../components/emailform"
import { HowItWorks } from "../components/howworks";
import { GetStartedSection } from "../components/getstarted";
import { Footer } from "../components/Footer";
import { AvailableZaps } from "../components/availablezaps";
export default function Home() {
  // const user=useSession()
  // console.log(user)
  return (
    <main className="">
        <Appbar />
        <Hero />
        <HowItWorks></HowItWorks>
        <GetStartedSection></GetStartedSection>
        {/* <div className="pt-8">
          <HeroVideo />
        </div> */}
        {/* <CreateZapButton></CreateZapButton> */}
        <AvailableZaps></AvailableZaps>
        {/* <WebhookTester></WebhookTester> */}
        {/* <Webhookform></Webhookform> */}
        <Footer></Footer>
    </main>
  );
}

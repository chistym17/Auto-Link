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
import { ReviewSection } from "../components/reviews";
import getUserInfo from "../lib/actions/getuserinfo";
export default function Home() {
  // const user=useSession()
  // console.log(user)
  const res=getUserInfo();
  console.log(res);
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
        <ReviewSection></ReviewSection>
        <WebhookTester></WebhookTester>
        {/* <Webhookform></Webhookform> */}
        <Footer></Footer>
    </main>
  );
}

"use client"
import { Appbar } from "../components/Appbar";
import { Hero } from "../components/Hero";
import { HeroVideo } from "../components/HeroVideo";
import { useSession } from "next-auth/react";
import CreateZapButton from "../components/zapbtn"
import WebhookTester from "../components/testurl"
import Webhookform from "../components/emailform"
export default function Home() {
  // const user=useSession()
  // console.log(user)
  return (
    <main className="pb-48">
        <Appbar />
        <Hero />
        <div className="pt-8">
          <HeroVideo />
        </div>
        <CreateZapButton></CreateZapButton>
        <WebhookTester></WebhookTester>
        <Webhookform></Webhookform>
    </main>
  );
}

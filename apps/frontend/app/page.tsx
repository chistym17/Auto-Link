"use client"
import { Appbar } from "../components/Appbar";
import { Hero } from "../components/Hero";
import { HeroVideo } from "../components/HeroVideo";
import { useSession } from "next-auth/react";

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
    </main>
  );
}

import Header from "@/components/Header";
import ModelCacheProvider from "@/components/ModelCacheProvider";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import HowItWorks from "@/components/sections/HowItWorks";
import UseCases from "@/components/sections/UseCases";
import Features from "@/components/sections/Features";
import Faq from "@/components/sections/Faq";
import BottomCta from "@/components/sections/BottomCta";

export default function Home() {
  return (
    <>
      <ModelCacheProvider />
      <Header />

      <main id="main-content" className="flex-1">
        <Hero />
        <SocialProof />
        <HowItWorks />
        <UseCases />
        <Features />
        <Faq />
        <BottomCta />
      </main>

      <Footer />
    </>
  );
}

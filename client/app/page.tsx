import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Footer from "@/components/home/Footer";
import UpcomingFeatures from "@/components/home/UpcomingFeatures";

export default function Home() {
  return (
    <>
      <Navbar />  
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <UpcomingFeatures />
      </main>
      <Footer />
    </>
  );
}

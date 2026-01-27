import Navbar from "../components/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorks from "../components/landing/HowItWorks";
import StatsSection from "../components/landing/StatsSection";
import CTASection from "../components/landing/CtaSection";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>  
  );
};

export default LandingPage;

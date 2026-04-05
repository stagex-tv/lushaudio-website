import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PluginsSection from "./components/PluginsSection";
import LushStudioSection from "./components/LushStudioSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <Hero />
      <PluginsSection />
      <LushStudioSection />
      <AboutSection />
      <Footer />
    </>
  );
}

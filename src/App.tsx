import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import CreativeSection from './components/CreativeSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';

export default function App() {
  return (
    <>
      <div className="noise" />
      
      {/* Fixed background for Hero */}
      <BackgroundVideo />

      {/* Global Navbar */}
      <Navbar />

      {/* Main content flow */}
      <main>
        <HeroSection />
        <ProjectsSection />
        <CreativeSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}

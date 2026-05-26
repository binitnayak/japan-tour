import { useLenisInit } from '@/hooks/useLenis';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import WhatsIncluded from '@/sections/WhatsIncluded';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

export default function App() {
  useLenisInit();

  return (
    <div className="relative bg-mist-black">
      <Navigation />
      <main>
        <Hero />
        <About />
        <WhatsIncluded />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

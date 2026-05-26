import { useEffect, useRef, useState } from 'react';
import { Globe, Instagram, Facebook, Send } from 'lucide-react';
import { getLenis } from '@/hooks/useLenis';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(id, { offset: -64 });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between transition-all duration-500 ease-out"
      style={{
        paddingLeft: 'clamp(20px, 4vw, 80px)',
        paddingRight: 'clamp(20px, 4vw, 80px)',
        backgroundColor: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      {/* Left — Wordmark */}
      <button
        onClick={() => scrollTo('#hero')}
        className="flex items-center gap-2 text-kimono-white hover:opacity-80 transition-opacity"
      >
        <Globe className="w-4 h-4" strokeWidth={1.5} />
        <span className="small-caps tracking-[0.15em]">JAPAN TOURS</span>
      </button>

      {/* Center-Right — Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <button onClick={() => scrollTo('#about')} className="nav-underline small-caps text-kimono-white">
          ABOUT
        </button>
        <button onClick={() => scrollTo('#included')} className="nav-underline small-caps text-kimono-white">
          INCLUDED
        </button>
        <button onClick={() => scrollTo('#contact')} className="nav-underline small-caps text-kimono-white">
          CONTACTS
        </button>
        <button onClick={() => scrollTo('#contact')} className="book-pill ml-4">
          BOOK
        </button>
      </div>

      {/* Far Right — Social Icons */}
      <div className="hidden lg:flex flex-col items-center gap-3 fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-kimono-white opacity-60 hover:opacity-100 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(212,248,122,0.4)]"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" strokeWidth={1.5} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-kimono-white opacity-60 hover:opacity-100 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(212,248,122,0.4)]"
          aria-label="Facebook"
        >
          <Facebook className="w-5 h-5" strokeWidth={1.5} />
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          className="text-kimono-white opacity-60 hover:opacity-100 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(212,248,122,0.4)]"
          aria-label="Telegram"
        >
          <Send className="w-5 h-5" strokeWidth={1.5} />
        </a>
      </div>
    </nav>
  );
}

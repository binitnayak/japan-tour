import { Globe, Instagram, Facebook, Send } from 'lucide-react';
import { getLenis } from '@/hooks/useLenis';

export default function Footer() {
  const scrollTo = (id: string) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(id, { offset: -64 });
    }
  };

  return (
    <footer className="bg-mist-black border-t border-glass-border">
      <div className="content-padding max-w-[1200px] mx-auto py-12">
        {/* Main row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left — Wordmark */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-2 text-kimono-white hover:opacity-80 transition-opacity"
          >
            <Globe className="w-4 h-4" strokeWidth={1.5} />
            <span className="small-caps tracking-[0.15em]">JAPAN TOURS</span>
          </button>

          {/* Center — Nav */}
          <div className="flex items-center gap-6 md:gap-8">
            <button onClick={() => scrollTo('#hero')} className="nav-underline small-caps text-kimono-white">
              HOME
            </button>
            <button onClick={() => scrollTo('#about')} className="nav-underline small-caps text-kimono-white">
              ABOUT
            </button>
            <button onClick={() => scrollTo('#included')} className="nav-underline small-caps text-kimono-white">
              INCLUDED
            </button>
            <button onClick={() => scrollTo('#contact')} className="nav-underline small-caps text-kimono-white">
              CONTACTS
            </button>
          </div>

          {/* Right — Book + Social */}
          <div className="flex items-center gap-6">
            <button onClick={() => scrollTo('#contact')} className="book-pill">
              BOOK
            </button>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kimono-white opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kimono-white opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-kimono-white opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-8 pt-8 border-t border-glass-border">
          <span className="text-[11px] text-mouse-gray" style={{ letterSpacing: '0.02em' }}>
            &copy; 2025 Japan Tours
          </span>
          <span className="text-[11px] text-mouse-gray" style={{ letterSpacing: '0.02em' }}>
            All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}

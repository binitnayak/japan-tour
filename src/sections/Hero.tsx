import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const polaroids = [
  { img: '/assets/polaroid-1.jpg', caption: '3 cities in Japan' },
  { img: '/assets/polaroid-2.jpg', caption: '10 days' },
  { img: '/assets/polaroid-3.jpg', caption: 'gigabytes of photos' },
  { img: '/assets/polaroid-4.jpg', caption: 'eat ramen' },
  { img: '/assets/polaroid-5.jpg', caption: 'enjoy the vibe' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const polaroidsRef = useRef<HTMLDivElement>(null);
  const bookBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const text = textRef.current;
    const polaroidsEl = polaroidsRef.current;
    const bookBtn = bookBtnRef.current;

    if (!section || !bg || !text || !polaroidsEl || !bookBtn) return;

    const ctx = gsap.context(() => {
      // Pin the hero
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100vh',
        pin: true,
        scrub: true,
      });

      // Background parallax - moves up at 0.3x
      gsap.to(bg, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100vh',
          scrub: true,
        },
      });

      // Text parallax - moves up at 0.5x
      gsap.to(text, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100vh',
          scrub: true,
        },
      });

      // Polaroids drift left at -0.4x
      gsap.to(polaroidsEl, {
        xPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100vh',
          scrub: true,
        },
      });

      // Book button fades out
      gsap.to(bookBtn, {
        opacity: 0,
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=60vh',
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-mist-black"
    >
      {/* Background Layer — Misty Mountains */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: 'scale(1.15)' }}
      >
        <img
          src="/assets/hero-mountains.jpg"
          alt="Misty Japanese mountains at dawn"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Warm gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(245,232,211,0.1) 0%, transparent 40%, rgba(10,10,10,0.4) 100%)',
          }}
        />
      </div>

      {/* Typography Layer — "JAPAN" */}
      <div
        ref={textRef}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none will-change-transform"
      >
        <h1
          className="text-display-xl text-kimono-white select-none"
          style={{
            textShadow: '0 2px 40px rgba(0,0,0,0.3)',
            marginTop: '-8vh',
          }}
        >
          JAPAN
        </h1>
      </div>

      {/* Foreground Layer — Kimono Figure */}
      <div
        ref={figureRef}
        className="absolute z-20 will-change-transform"
        style={{
          right: 'clamp(20px, 5vw, 80px)',
          bottom: 0,
          width: 'clamp(180px, 25vw, 380px)',
          height: '85%',
        }}
      >
        <img
          src="/assets/hero-kimono.png"
          alt="Woman in floral kimono gazing at the mountains"
          className="w-full h-full object-contain object-bottom"
          loading="eager"
        />
      </div>

      {/* Polaroid Strip */}
      <div
        ref={polaroidsRef}
        className="absolute z-30 will-change-transform"
        style={{
          bottom: '12%',
          left: 'clamp(20px, 4vw, 80px)',
        }}
      >
        <div className="flex items-end" style={{ marginLeft: '-10px' }}>
          {polaroids.map((p, i) => (
            <div
              key={i}
              className="polaroid cursor-pointer"
              style={{
                width: 'clamp(90px, 10vw, 120px)',
                marginLeft: i > 0 ? '-10px' : '0',
                zIndex: polaroids.length - i,
                transform: `rotate(${-4 + i * 2}deg)`,
              }}
            >
              <div className="w-full aspect-square overflow-hidden">
                <img
                  src={p.img}
                  alt={p.caption}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p
                className="absolute bottom-1.5 left-2 text-[10px] text-mist-black font-body"
                style={{ letterSpacing: '0.02em' }}
              >
                {p.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Book Button */}
      <button
        ref={bookBtnRef}
        className="absolute z-30 will-change-transform hidden md:block"
        style={{
          right: 'clamp(220px, 32vw, 420px)',
          bottom: '18%',
          background: '#F5E8D3',
          backdropFilter: 'blur(4px)',
          padding: '16px 48px',
          borderRadius: '9999px',
          color: '#0A0A0A',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          transition: 'all 0.4s ease-out',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.background = 'linear-gradient(to top, #D4F87A, #F5E8D3)';
          el.style.transform = 'translateY(-2px)';
          el.style.boxShadow = '0 8px 30px rgba(212,248,122,0.3)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.background = '#F5E8D3';
          el.style.transform = 'translateY(0)';
          el.style.boxShadow = 'none';
        }}
      >
        BOOK NOW
      </button>

      {/* Bottom gradient fade to black */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #0A0A0A, transparent)',
        }}
      />
    </section>
  );
}

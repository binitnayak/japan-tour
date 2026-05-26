import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Plane, Bus, Building } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Users,
    title: 'GUIDES',
    description: '2 awesome guides who know everything about Japan!',
  },
  {
    icon: Plane,
    title: 'FLIGHTS',
    description: 'Routes: Moscow — Osaka, Tokyo — Moscow',
  },
  {
    icon: Bus,
    title: 'TRANSFERS',
    description: 'From the airport to the hotels',
  },
  {
    icon: Building,
    title: 'HOTELS',
    description: 'Comfortable accommodation, 2 people per room (breakfasts included)',
  },
];

export default function WhatsIncluded() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading line draws left to right
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards stagger in
      const cardEls = gridRef.current?.querySelectorAll('.included-card');
      if (cardEls) {
        gsap.fromTo(
          cardEls,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="included"
      ref={sectionRef}
      className="relative bg-mist-black section-padding border-t border-glass-border"
    >
      <div className="content-padding max-w-[1200px] mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="flex items-center gap-4">
          <h2 className="text-display-l text-kimono-white whitespace-nowrap">WHAT&apos;S INCLUDED</h2>
          <div ref={lineRef} className="hairline flex-1" />
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="included-card glass-card p-8 transition-all duration-300 cursor-pointer group"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(-4px)';
                  el.style.borderColor = 'rgba(212, 248, 122, 0.4)';
                  el.style.boxShadow = '0 8px 40px rgba(212, 248, 122, 0.1)';
                  const icon = el.querySelector('.card-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  el.style.boxShadow = 'none';
                  const icon = el.querySelector('.card-icon') as HTMLElement;
                  if (icon) icon.style.transform = 'scale(1)';
                }}
              >
                <Icon
                  className="card-icon w-7 h-7 text-lime-accent transition-transform duration-300"
                  strokeWidth={1.5}
                />
                <h3 className="text-display-m text-kimono-white mt-5">{card.title}</h3>
                <p className="text-body text-mouse-gray mt-3 leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

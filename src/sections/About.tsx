import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    days: 'Days 1–3',
    city: 'Osaka',
    photos: [
      { src: '/assets/timeline-osaka-1.jpg', alt: 'Osaka Castle with cherry blossoms', rotation: -3 },
      { src: '/assets/timeline-osaka-2.jpg', alt: 'Osaka city skyline at night', rotation: 2 },
    ],
  },
  {
    days: 'Days 4–6',
    city: 'Kyoto',
    photos: [
      { src: '/assets/timeline-kyoto-1.jpg', alt: 'Traditional pagoda at sunset', rotation: 3 },
      { src: '/assets/timeline-kyoto-2.jpg', alt: 'Fushimi Inari torii gates', rotation: -2 },
    ],
  },
  {
    days: 'Days 7–10',
    city: 'Tokyo',
    photos: [
      { src: '/assets/timeline-tokyo-1.jpg', alt: 'Shibuya crossing at night', rotation: -2 },
      { src: '/assets/timeline-tokyo-2.jpg', alt: 'Traditional Tokyo street with lanterns', rotation: 3 },
    ],
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading hairlines draw from center outward
      gsap.fromTo(
        lineLeftRef.current,
        { scaleX: 0, transformOrigin: 'right center' },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        lineRightRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Text paragraphs fade in
      const paragraphs = textLeftRef.current?.querySelectorAll('.reveal-text');
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: textLeftRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Lime accent highlights fade in after text
      const highlights = textLeftRef.current?.querySelectorAll('.lime-highlight');
      if (highlights) {
        gsap.fromTo(
          highlights,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textLeftRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Timeline hairline draws downward
      gsap.fromTo(
        hairlineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Timeline nodes stagger in
      const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
      nodes?.forEach((node, i) => {
        const circle = node.querySelector('.node-circle');
        const label = node.querySelector('.node-label');
        const photos = node.querySelectorAll('.timeline-photo');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(
          circle,
          { scale: 0 },
          { scale: 1, duration: 0.3, ease: 'back.out(2)', delay: i * 0.2 }
        )
          .fromTo(
            label,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'cubic-bezier(0.16, 1, 0.3, 1)' },
            '-=0.1'
          )
          .fromTo(
            photos,
            { x: (j) => (j === 0 ? -30 : 30), opacity: 0, rotation: (j) => (j === 0 ? -8 : 8) },
            {
              x: 0,
              opacity: 1,
              rotation: (j) => timelineData[i].photos[j].rotation,
              duration: 0.5,
              stagger: 0.1,
              ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            '-=0.2'
          );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-mist-black section-padding"
    >
      {/* Heading with hairlines */}
      <div ref={headingRef} className="flex items-center justify-center gap-4 content-padding">
        <div ref={lineLeftRef} className="hairline flex-1" />
        <h2 className="text-display-l text-kimono-white whitespace-nowrap">ABOUT THE TOUR</h2>
        <div ref={lineRightRef} className="hairline flex-1" />
      </div>

      {/* Two-column layout */}
      <div className="content-padding max-w-[1200px] mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left — Text */}
        <div ref={textLeftRef} className="flex flex-col justify-center">
          <p className="reveal-text text-body-large text-kimono-white">
            We&apos;ve planned a simple and convenient 10-day itinerary for your trip to Japan.
            You&apos;ll visit three cities:{' '}
            <span className="lime-accent text-lime-accent" style={{ opacity: 0 }}>
              Osaka, Kyoto, and Tokyo
            </span>
            .
          </p>
          <p className="reveal-text text-body-large text-kimono-white mt-8">
            No need to worry about routes, schedules, or finding places — everything is already
            organized. We&apos;ll show you where to go, what to see, and where to eat, so you can
            simply{' '}
            <span className="lime-accent text-lime-accent" style={{ opacity: 0 }}>
              enjoy the journey
            </span>
            .
          </p>
        </div>

        {/* Right — Timeline */}
        <div ref={timelineRef} className="relative pl-8 lg:pl-0">
          {/* Vertical hairline */}
          <div
            ref={hairlineRef}
            className="absolute left-4 lg:left-6 top-0 bottom-0 w-px bg-glass-border"
            style={{ transformOrigin: 'top center' }}
          />

          {/* Timeline nodes */}
          <div className="space-y-16">
            {timelineData.map((item, i) => (
              <div key={i} className="timeline-node relative">
                {/* Circle on the line */}
                <div
                  className="node-circle absolute left-4 lg:left-6 top-2 w-3 h-3 bg-kimono-white rounded-full -translate-x-1/2"
                />

                {/* Content */}
                <div className="ml-12 lg:ml-16">
                  <div className="node-label">
                    <span className="small-caps text-mouse-gray">{item.days} — </span>
                    <span className="text-body-large text-kimono-white font-semibold">{item.city}</span>
                  </div>

                  {/* Photo cluster */}
                  <div className="mt-4 relative h-[120px] lg:h-[140px]">
                    {item.photos.map((photo, j) => (
                      <div
                        key={j}
                        className="timeline-photo absolute w-[140px] lg:w-[160px] h-[90px] lg:h-[100px] rounded-sm overflow-hidden shadow-lg cursor-pointer transition-all duration-300"
                        style={{
                          left: j === 0 ? '0' : '60px',
                          top: j === 0 ? '0' : '20px',
                          transform: `rotate(${photo.rotation}deg)`,
                          border: '3px solid white',
                          zIndex: j === 0 ? 1 : 2,
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          const sibling = el.parentElement?.querySelectorAll('.timeline-photo');
                          sibling?.forEach((s, idx) => {
                            const htmlS = s as HTMLElement;
                            if (idx === j) {
                              htmlS.style.transform = `rotate(${photo.rotation + (j === 0 ? -2 : 2)}deg) translateY(-4px)`;
                            } else {
                              htmlS.style.transform = `rotate(${timelineData[i].photos[idx].rotation + (idx === 0 ? -2 : 2)}deg)`;
                            }
                          });
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          const sibling = el.parentElement?.querySelectorAll('.timeline-photo');
                          sibling?.forEach((s, idx) => {
                            const htmlS = s as HTMLElement;
                            htmlS.style.transform = `rotate(${timelineData[i].photos[idx].rotation}deg)`;
                          });
                        }}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

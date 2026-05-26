import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', comment: '' });
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;

    const ctx = gsap.context(() => {
      // Panel slides in from left
      gsap.fromTo(
        panel,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission placeholder
    alert('Thank you! We will contact you soon.');
    setFormData({ name: '', phone: '', comment: '' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background — Cherry Blossoms & Mount Fuji */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/contact-bg.jpg"
          alt="Cherry blossoms framing Mount Fuji"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(245,232,211,0.1), rgba(245,232,211,0.05))',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(10,10,10,0.4) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Frosted Glass Form Panel */}
      <div
        ref={panelRef}
        className="relative z-10 glass-panel p-10 md:p-12 w-full max-w-[420px]"
        style={{
          marginLeft: 'clamp(20px, 4vw, 80px)',
          marginTop: '60px',
          marginBottom: '60px',
        }}
      >
        <h3 className="text-editorial text-kimono-white italic">
          Want to join us, but still have questions?
        </h3>
        <p className="small-caps text-lime-accent mt-4">LEAVE A REQUEST</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {/* Name */}
          <div className="relative">
            <label
              className="absolute left-0 transition-all duration-300 pointer-events-none"
              style={{
                top: focused === 'name' || formData.name ? '-20px' : '12px',
                fontSize: focused === 'name' || formData.name ? '12px' : '14px',
                color: focused === 'name' ? '#D4F87A' : '#888888',
                transform: focused === 'name' || formData.name ? 'scale(0.85)' : 'scale(1)',
                transformOrigin: 'left center',
              }}
            >
              Your name
            </label>
            <input
              type="text"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <label
              className="absolute left-0 transition-all duration-300 pointer-events-none"
              style={{
                top: focused === 'phone' || formData.phone ? '-20px' : '12px',
                fontSize: focused === 'phone' || formData.phone ? '12px' : '14px',
                color: focused === 'phone' ? '#D4F87A' : '#888888',
                transform: focused === 'phone' || formData.phone ? 'scale(0.85)' : 'scale(1)',
                transformOrigin: 'left center',
              }}
            >
              Phone number
            </label>
            <input
              type="tel"
              className="form-input"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              onFocus={() => setFocused('phone')}
              onBlur={() => setFocused(null)}
              required
            />
          </div>

          {/* Comment */}
          <div className="relative">
            <label
              className="absolute left-0 transition-all duration-300 pointer-events-none"
              style={{
                top: focused === 'comment' || formData.comment ? '-20px' : '12px',
                fontSize: focused === 'comment' || formData.comment ? '12px' : '14px',
                color: focused === 'comment' ? '#D4F87A' : '#888888',
                transform: focused === 'comment' || formData.comment ? 'scale(0.85)' : 'scale(1)',
                transformOrigin: 'left center',
              }}
            >
              Comment
            </label>
            <textarea
              className="form-input resize-none"
              rows={3}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              onFocus={() => setFocused('comment')}
              onBlur={() => setFocused(null)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-full text-mist-black small-caps transition-all duration-300 mt-8"
            style={{
              background: '#F5E8D3',
              letterSpacing: '0.15em',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#D4F87A';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(212,248,122,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F5E8D3';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            SEND
          </button>
        </form>
      </div>
    </section>
  );
}

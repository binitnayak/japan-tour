import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  scale?: number;
  ease?: string;
  threshold?: string;
  childSelector?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    y = 40,
    x = 0,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    scale = 1,
    ease = 'cubic-bezier(0.16, 1, 0.3, 1)',
    threshold = 'top 80%',
    childSelector,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = childSelector ? el.querySelectorAll(childSelector) : el;

    gsap.set(targets, { y, x, opacity, scale });

    const tween = gsap.to(targets, {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      duration,
      delay,
      stagger: stagger || 0,
      ease,
      scrollTrigger: {
        trigger: el,
        start: threshold,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [y, x, opacity, duration, delay, stagger, scale, ease, threshold, childSelector]);

  return ref;
}

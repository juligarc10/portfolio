import { gsap, ScrollTrigger } from './deps';

export function initTimelineAnimation() {
  // Pre-set timeline entries as hidden
  gsap.set('.timeline-entry', { opacity: 0, x: 0 });
  document.querySelectorAll<HTMLElement>('.timeline-entry').forEach((entry, i) => {
    gsap.set(entry, { x: i % 2 === 0 ? -60 : 60 });
  });

  // Animate vertical line growing downward
  const line = document.querySelector('#timeline-line') as HTMLElement | null;
  if (line) {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: '#experience',
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 0.8,
        },
      }
    );
  }

  // Timeline entries sliding in from alternating sides
  document.querySelectorAll('.timeline-entry').forEach((entry, i) => {
    const fromLeft = i % 2 === 0;
    gsap.to(entry, {
      opacity: 1,
      x: 0,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: entry,
        start: 'top 95%',
        once: true,
      },
    });
  });
}

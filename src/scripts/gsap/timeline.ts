import { gsap, ScrollTrigger } from './deps';

export function initTimelineAnimation() {
  // Animate vertical line growing downward
  const line = document.querySelector('#timeline-line') as HTMLElement | null;
  if (line) {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
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
    gsap.from(entry, {
      opacity: 0,
      x: fromLeft ? -60 : 60,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: entry,
        start: 'top 82%',
        once: true,
      },
    });
  });
}

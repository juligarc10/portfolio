import { gsap } from './deps';

export function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Name characters
  const nameChars = document.querySelectorAll('#hero-name .char');
  if (nameChars.length) {
    tl.from(nameChars, {
      opacity: 0,
      y: 60,
      rotateX: -90,
      duration: 0.7,
      stagger: 0.035,
      transformOrigin: '0% 50% -50px',
    });
  }

  // Tagline words
  const taglineWords = document.querySelectorAll('#hero-tagline .word');
  if (taglineWords.length) {
    tl.from(taglineWords, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.07,
    }, '-=0.3');
  }

  // Sub-tagline
  const sub = document.querySelector('#hero-sub');
  if (sub) {
    tl.from(sub, { opacity: 0, y: 20, duration: 0.4 }, '-=0.2');
  }

  // CTA buttons
  const ctas = document.querySelectorAll('#hero-cta > *');
  if (ctas.length) {
    tl.from(ctas, {
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.4,
      stagger: 0.1,
      ease: 'back.out(1.5)',
    }, '-=0.2');
  }

  // Badge
  const badge = document.querySelector('#hero-badge');
  if (badge) {
    tl.from(badge, { opacity: 0, x: -20, duration: 0.4 }, '-=0.3');
  }

  // Scroll hint
  const scrollHint = document.querySelector('#hero-scroll');
  if (scrollHint) {
    tl.from(scrollHint, { opacity: 0, y: 10, duration: 0.4 }, '-=0.1');
  }
}

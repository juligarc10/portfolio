import { gsap, ScrollTrigger } from './deps';

export function initSectionAnimations() {
  // Pre-set initial hidden states before any scroll happens
  gsap.set('[data-reveal]', { opacity: 0, y: 40 });
  gsap.set('.project-card', { opacity: 0, y: 50, scale: 0.96 });
  gsap.set('#about-photo', { opacity: 0, scale: 0.88 });
  gsap.set('#skills-title', { opacity: 0, y: 30 });
  gsap.set('#contact-card', { opacity: 0, y: 40 });

  // Generic reveal for elements with data-reveal
  ScrollTrigger.batch('[data-reveal]', {
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });
    },
    once: true,
    start: 'top 95%',
  });

  // About section
  const aboutPhoto = document.querySelector('#about-photo');
  if (aboutPhoto) {
    gsap.to(aboutPhoto, {
      scrollTrigger: { trigger: '#about', start: 'top 90%', once: true },
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.3)',
    });
  }

  // Project cards
  ScrollTrigger.batch('.project-card', {
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      });
    },
    once: true,
    start: 'top 95%',
  });

  // Skills section header
  const skillsTitle = document.querySelector('#skills-title');
  if (skillsTitle) {
    gsap.to(skillsTitle, {
      scrollTrigger: { trigger: '#skills', start: 'top 90%', once: true },
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  }

  // Contact section
  const contactCard = document.querySelector('#contact-card');
  if (contactCard) {
    gsap.to(contactCard, {
      scrollTrigger: { trigger: '#contact', start: 'top 90%', once: true },
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    });
  }
}

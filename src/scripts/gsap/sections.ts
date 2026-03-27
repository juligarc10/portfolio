import { gsap, ScrollTrigger } from './deps';

export function initSectionAnimations() {
  // Generic reveal for elements with data-reveal
  ScrollTrigger.batch('[data-reveal]', {
    onEnter: (batch) => {
      gsap.from(batch, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });
    },
    once: true,
    start: 'top 85%',
  });

  // About section
  const aboutPhoto = document.querySelector('#about-photo');
  if (aboutPhoto) {
    gsap.from(aboutPhoto, {
      scrollTrigger: { trigger: '#about', start: 'top 75%', once: true },
      opacity: 0,
      scale: 0.88,
      duration: 0.8,
      ease: 'back.out(1.3)',
    });
  }

  // Project cards
  ScrollTrigger.batch('.project-card', {
    onEnter: (batch) => {
      gsap.from(batch, {
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      });
    },
    once: true,
    start: 'top 88%',
  });

  // Skills section header
  const skillsTitle = document.querySelector('#skills-title');
  if (skillsTitle) {
    gsap.from(skillsTitle, {
      scrollTrigger: { trigger: '#skills', start: 'top 80%', once: true },
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
    });
  }

  // Contact section
  const contactCard = document.querySelector('#contact-card');
  if (contactCard) {
    gsap.from(contactCard, {
      scrollTrigger: { trigger: '#contact', start: 'top 80%', once: true },
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
    });
  }
}

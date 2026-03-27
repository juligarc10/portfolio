import { gsap, ScrollTrigger } from './deps';

export function initSkillsAnimation() {
  document.querySelectorAll<HTMLElement>('.skill-bar-fill').forEach((bar) => {
    const level = bar.dataset.level ?? '0';
    gsap.fromTo(
      bar,
      { width: '0%' },
      {
        width: `${level}%`,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });

  // Skill group tabs (category headers)
  document.querySelectorAll('.skill-group').forEach((group) => {
    gsap.from(group, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: group,
        start: 'top 85%',
        once: true,
      },
    });
  });
}

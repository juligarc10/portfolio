interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
  color: string;
}

export function initHeroParticles(canvasId = 'hero-canvas') {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let raf: number;
  const mouse = { x: -1000, y: -1000 };

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Mouse tracking on hero section
  const hero = canvas.parentElement;
  hero?.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });
  hero?.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  }, { passive: true });

  const COUNT = window.innerWidth < 768 ? 55 : 110;
  const COLORS = ['#22d3ee', '#a855f7', '#ec4899', '#38bdf8'];
  const CONNECT_DIST = 130;
  const REPEL_DIST = 100;

  const particles: Particle[] = Array.from({ length: COUNT }, () => {
    const vx = (Math.random() - 0.5) * 0.45;
    const vy = (Math.random() - 0.5) * 0.45;
    return {
      x: Math.random() * (canvas.width || window.innerWidth),
      y: Math.random() * (canvas.height || window.innerHeight),
      vx, vy, baseVx: vx, baseVy: vy,
      size: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.45 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  });

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < COUNT; i++) {
      const p = particles[i];

      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_DIST && dist > 0) {
        const force = (REPEL_DIST - dist) / REPEL_DIST;
        p.vx += (dx / dist) * force * 0.4;
        p.vy += (dy / dist) * force * 0.4;
      }

      // Damping toward base velocity
      p.vx += (p.baseVx - p.vx) * 0.02;
      p.vy += (p.baseVy - p.vy) * 0.02;

      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();

      // Draw connection lines
      for (let j = i + 1; j < COUNT; j++) {
        const q = particles[j];
        const dx2 = p.x - q.x;
        const dy2 = p.y - q.y;
        const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (d2 < CONNECT_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - d2 / CONNECT_DIST) * 0.12;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(draw);
  };

  draw();

  // Cleanup for Astro view transitions
  document.addEventListener('astro:before-swap', () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
  }, { once: true });
}

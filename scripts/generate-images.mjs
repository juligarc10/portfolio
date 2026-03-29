/**
 * Generates consistent project card images for the portfolio.
 * Run with: node scripts/generate-images.mjs
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECTS_DIR = path.join(__dirname, '../src/content/projects');
const OUTPUT_DIR = path.join(__dirname, '../public/images/projects');
const WIDTH = 1200;
const HEIGHT = 500;

// ─── Frontmatter parser ────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const yaml = match[1];

  const getString = (key) => {
    const m = yaml.match(new RegExp(`${key}:\\s*"([^"]+)"`));
    return m ? m[1] : '';
  };

  const getArray = (key) => {
    const m = yaml.match(new RegExp(`${key}:\\s*\\[([\\s\\S]*?)\\]`));
    if (!m) return [];
    return m[1]
      .split(/[\n,]/)
      .map((s) => s.trim().replace(/["']/g, ''))
      .filter(Boolean);
  };

  return {
    title: getString('title'),
    tagline: getString('tagline'),
    categories: getArray('categories'),
    techs: getArray('techs'),
  };
}

// ─── Category styles ───────────────────────────────────────────────────────────

const CATEGORY = {
  backend:   { label: '// backend',   color: '#22d3ee', bg: 'rgba(34,211,238,0.1)',  border: 'rgba(34,211,238,0.25)',  g1: '#22d3ee', g2: '#a855f7' },
  frontend:  { label: '// frontend',  color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.25)', g1: '#a855f7', g2: '#22d3ee' },
  devops:    { label: '// devops',    color: '#22d3ee', bg: 'rgba(34,211,238,0.1)',  border: 'rgba(34,211,238,0.25)',  g1: '#22d3ee', g2: '#a855f7' },
  ai:        { label: '// ai',        color: '#ec4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.25)', g1: '#a855f7', g2: '#ec4899' },
  fullstack: { label: '// fullstack', color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.25)', g1: '#22d3ee', g2: '#a855f7' },
  mobile:    { label: '// mobile',    color: '#ec4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.25)', g1: '#ec4899', g2: '#a855f7' },
};

// ─── SVG decorations ───────────────────────────────────────────────────────────

const DECORATIONS = {
  // Hub-and-spoke: distributed systems / microservices
  backend: (color) => `
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="150" cy="150" r="115" stroke="${color}" stroke-width="0.6" stroke-dasharray="5 9" opacity="0.3"/>
      <circle cx="150" cy="150" r="75"  stroke="${color}" stroke-width="0.6" stroke-dasharray="3 6" opacity="0.2"/>
      <line x1="150" y1="35"  x2="150" y2="75"  stroke="${color}" stroke-width="1"/>
      <line x1="150" y1="225" x2="150" y2="265" stroke="${color}" stroke-width="1"/>
      <line x1="35"  y1="150" x2="75"  y2="150" stroke="${color}" stroke-width="1"/>
      <line x1="225" y1="150" x2="265" y2="150" stroke="${color}" stroke-width="1"/>
      <line x1="69"  y1="69"  x2="97"  y2="97"  stroke="${color}" stroke-width="1"/>
      <line x1="231" y1="69"  x2="203" y2="97"  stroke="${color}" stroke-width="1"/>
      <line x1="69"  y1="231" x2="97"  y2="203" stroke="${color}" stroke-width="1"/>
      <line x1="231" y1="231" x2="203" y2="203" stroke="${color}" stroke-width="1"/>
      <circle cx="150" cy="35"  r="7" fill="${color}" opacity="0.8"/>
      <circle cx="150" cy="265" r="7" fill="${color}" opacity="0.8"/>
      <circle cx="35"  cy="150" r="7" fill="${color}" opacity="0.8"/>
      <circle cx="265" cy="150" r="7" fill="${color}" opacity="0.8"/>
      <circle cx="69"  cy="69"  r="5" fill="${color}" opacity="0.6"/>
      <circle cx="231" cy="69"  r="5" fill="${color}" opacity="0.6"/>
      <circle cx="69"  cy="231" r="5" fill="${color}" opacity="0.6"/>
      <circle cx="231" cy="231" r="5" fill="${color}" opacity="0.6"/>
      <circle cx="150" cy="150" r="18" fill="${color}" opacity="0.15"/>
      <circle cx="150" cy="150" r="10" fill="${color}" opacity="0.9"/>
    </svg>`,

  // Stacked containers: Docker / k8s / DevOps
  devops: (color) => `
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="50"  y="62"  width="200" height="52" rx="5" stroke="${color}" stroke-width="1.2" fill="${color}" fill-opacity="0.05"/>
      <rect x="50"  y="62"  width="200" height="16" rx="5" fill="${color}" fill-opacity="0.08"/>
      <circle cx="69"  cy="70" r="4" fill="${color}" opacity="0.7"/>
      <circle cx="84"  cy="70" r="4" fill="${color}" opacity="0.4"/>
      <circle cx="99"  cy="70" r="4" fill="${color}" opacity="0.2"/>
      <rect x="110" y="66" width="80" height="8" rx="3" fill="${color}" fill-opacity="0.2"/>

      <rect x="50"  y="124" width="200" height="52" rx="5" stroke="${color}" stroke-width="1.2" fill="${color}" fill-opacity="0.05"/>
      <rect x="50"  y="124" width="200" height="16" rx="5" fill="${color}" fill-opacity="0.08"/>
      <circle cx="69"  cy="132" r="4" fill="${color}" opacity="0.7"/>
      <circle cx="84"  cy="132" r="4" fill="${color}" opacity="0.4"/>
      <circle cx="99"  cy="132" r="4" fill="${color}" opacity="0.2"/>
      <rect x="110" y="128" width="60" height="8" rx="3" fill="${color}" fill-opacity="0.2"/>

      <rect x="50"  y="186" width="200" height="52" rx="5" stroke="${color}" stroke-width="1.2" fill="${color}" fill-opacity="0.05"/>
      <rect x="50"  y="186" width="200" height="16" rx="5" fill="${color}" fill-opacity="0.08"/>
      <circle cx="69"  cy="194" r="4" fill="${color}" opacity="0.7"/>
      <circle cx="84"  cy="194" r="4" fill="${color}" opacity="0.4"/>
      <circle cx="99"  cy="194" r="4" fill="${color}" opacity="0.2"/>
      <rect x="110" y="190" width="70" height="8" rx="3" fill="${color}" fill-opacity="0.2"/>

      <line x1="150" y1="114" x2="150" y2="124" stroke="${color}" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>
      <line x1="150" y1="176" x2="150" y2="186" stroke="${color}" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>
    </svg>`,

  // UI wireframe: frontend / browser
  frontend: (color) => `
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="55" width="220" height="190" rx="8" stroke="${color}" stroke-width="1.4"/>
      <rect x="40" y="55" width="220" height="30"  rx="8" fill="${color}" fill-opacity="0.08"/>
      <line x1="40" y1="85" x2="260" y2="85" stroke="${color}" stroke-width="0.8" opacity="0.4"/>
      <circle cx="60"  cy="70" r="5" fill="${color}" opacity="0.6"/>
      <circle cx="78"  cy="70" r="5" fill="${color}" opacity="0.35"/>
      <circle cx="96"  cy="70" r="5" fill="${color}" opacity="0.2"/>
      <rect x="130" y="63" width="80" height="10" rx="5" fill="${color}" fill-opacity="0.15"/>
      <rect x="56" y="100" width="188" height="10" rx="3" fill="${color}" fill-opacity="0.25"/>
      <rect x="56" y="118" width="140" height="10" rx="3" fill="${color}" fill-opacity="0.15"/>
      <rect x="56" y="140" width="80" height="65"  rx="4" stroke="${color}" stroke-width="1" opacity="0.3"/>
      <rect x="148" y="140" width="96" height="30" rx="4" fill="${color}" fill-opacity="0.06" stroke="${color}" stroke-width="0.8"/>
      <rect x="148" y="178" width="96" height="14" rx="3" fill="${color}" fill-opacity="0.08"/>
      <rect x="56" y="215" width="60" height="10"  rx="3" fill="${color}" fill-opacity="0.2"/>
      <rect x="190" y="215" width="54" height="10" rx="5" fill="${color}" fill-opacity="0.3"/>
    </svg>`,

  // Neural network: AI / ML
  ai: (color) => `
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="68" y1="90"  x2="132" y2="110" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="68" y1="90"  x2="132" y2="150" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="68" y1="90"  x2="132" y2="190" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="68" y1="150" x2="132" y2="110" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="68" y1="150" x2="132" y2="150" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="68" y1="150" x2="132" y2="190" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="68" y1="210" x2="132" y2="110" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="68" y1="210" x2="132" y2="150" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="68" y1="210" x2="132" y2="190" stroke="${color}" stroke-width="0.7" opacity="0.3"/>

      <line x1="148" y1="110" x2="212" y2="120" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="148" y1="110" x2="212" y2="180" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="148" y1="150" x2="212" y2="120" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="148" y1="150" x2="212" y2="180" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="148" y1="190" x2="212" y2="120" stroke="${color}" stroke-width="0.7" opacity="0.3"/>
      <line x1="148" y1="190" x2="212" y2="180" stroke="${color}" stroke-width="0.7" opacity="0.3"/>

      <circle cx="68"  cy="90"  r="9" fill="${color}" opacity="0.8"/>
      <circle cx="68"  cy="150" r="9" fill="${color}" opacity="0.8"/>
      <circle cx="68"  cy="210" r="9" fill="${color}" opacity="0.8"/>
      <circle cx="140" cy="110" r="9" fill="${color}" opacity="0.65"/>
      <circle cx="140" cy="150" r="9" fill="${color}" opacity="0.65"/>
      <circle cx="140" cy="190" r="9" fill="${color}" opacity="0.65"/>
      <circle cx="220" cy="120" r="9" fill="${color}" opacity="0.5"/>
      <circle cx="220" cy="180" r="9" fill="${color}" opacity="0.5"/>
    </svg>`,

  // Layered arch: fullstack
  fullstack: (color) => `
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="90"  y="58"  width="120" height="36" rx="5" stroke="${color}" stroke-width="1.2" fill="${color}" fill-opacity="0.07"/>
      <rect x="70"  y="106" width="160" height="36" rx="5" stroke="${color}" stroke-width="1.2" fill="${color}" fill-opacity="0.06"/>
      <rect x="50"  y="154" width="200" height="36" rx="5" stroke="${color}" stroke-width="1.2" fill="${color}" fill-opacity="0.05"/>
      <rect x="70"  y="202" width="160" height="36" rx="5" stroke="${color}" stroke-width="1.2" fill="${color}" fill-opacity="0.04"/>
      <line x1="150" y1="94"  x2="150" y2="106" stroke="${color}" stroke-width="1" stroke-dasharray="3 3" opacity="0.4"/>
      <line x1="150" y1="142" x2="150" y2="154" stroke="${color}" stroke-width="1" stroke-dasharray="3 3" opacity="0.4"/>
      <line x1="150" y1="190" x2="150" y2="202" stroke="${color}" stroke-width="1" stroke-dasharray="3 3" opacity="0.4"/>
      <text x="150" y="81"  font-family="monospace" font-size="11" fill="${color}" opacity="0.6" text-anchor="middle">UI</text>
      <text x="150" y="129" font-family="monospace" font-size="11" fill="${color}" opacity="0.6" text-anchor="middle">API</text>
      <text x="150" y="177" font-family="monospace" font-size="11" fill="${color}" opacity="0.6" text-anchor="middle">Services</text>
      <text x="150" y="225" font-family="monospace" font-size="11" fill="${color}" opacity="0.6" text-anchor="middle">Data</text>
    </svg>`,
};

DECORATIONS.mobile = DECORATIONS.frontend;

// ─── HTML template ─────────────────────────────────────────────────────────────

function generateHtml(data, primaryCategory) {
  const cat = CATEGORY[primaryCategory] || CATEGORY.backend;
  const techs = (data.techs || []).slice(0, 5);
  const decoFn = DECORATIONS[primaryCategory] || DECORATIONS.backend;
  const decoration = decoFn(cat.color);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      background: #050508;
      font-family: 'Inter', system-ui, sans-serif;
      overflow: hidden;
      position: relative;
    }

    .grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(34,211,238,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34,211,238,0.035) 1px, transparent 1px);
      background-size: 48px 48px;
    }

    .glow-l {
      position: absolute;
      width: 500px; height: 500px;
      left: -180px; top: -180px;
      background: ${cat.g1};
      border-radius: 50%;
      filter: blur(140px);
      opacity: 0.09;
    }
    .glow-r {
      position: absolute;
      width: 500px; height: 500px;
      right: -100px; bottom: -180px;
      background: ${cat.g2};
      border-radius: 50%;
      filter: blur(140px);
      opacity: 0.09;
    }

    .decoration {
      position: absolute;
      right: 90px;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.2;
    }

    .content {
      position: relative;
      z-index: 10;
      padding: 52px 58px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 760px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 14px;
      border-radius: 999px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 500;
      color: ${cat.color};
      background: ${cat.bg};
      border: 1px solid ${cat.border};
      width: fit-content;
      margin-bottom: 20px;
    }

    .title {
      font-size: 58px;
      font-weight: 700;
      letter-spacing: -1.5px;
      line-height: 1.05;
      background: linear-gradient(135deg, ${cat.g1}, ${cat.g2});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 16px;
    }

    .tagline {
      font-size: 18px;
      font-weight: 400;
      color: #4e6278;
      line-height: 1.55;
      max-width: 620px;
    }

    .techs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tech {
      padding: 5px 12px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: #3d5166;
      border: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.025);
    }
  </style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow-l"></div>
  <div class="glow-r"></div>
  <div class="decoration">${decoration}</div>
  <div class="content">
    <div>
      <div class="badge">${cat.label}</div>
      <h1 class="title">${data.title}</h1>
      <p class="tagline">${data.tagline}</p>
    </div>
    <div class="techs">
      ${techs.map((t) => `<span class="tech">${t}</span>`).join('')}
    </div>
  </div>
</body>
</html>`;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await fs.readdir(PROJECTS_DIR)).filter((f) => f.endsWith('.md'));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const file of files) {
    const slug = file.replace('.md', '');
    const content = await fs.readFile(path.join(PROJECTS_DIR, file), 'utf-8');
    const data = parseFrontmatter(content);
    const primaryCategory = data.categories?.[0] || 'backend';
    const html = generateHtml(data, primaryCategory);

    const page = await browser.newPage();
    await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const outPath = path.join(OUTPUT_DIR, `${slug}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    await page.close();

    console.log(`✓  ${slug}.png  [${primaryCategory}]`);
  }

  await browser.close();
  console.log('\n✅ Todas las imágenes generadas.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

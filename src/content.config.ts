import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    role: z.string(),
    period: z.string(),
    image: z.string().default('/images/projects/placeholder.png'),
    techs: z.array(z.string()),
    categories: z.array(z.enum(['backend', 'frontend', 'mobile', 'ai', 'devops', 'fullstack'])),
    links: z.object({
      github: z.string().url().optional(),
      live: z.string().url().optional(),
    }).default({}),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    highlights: z.array(z.string()).default([]),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    location: z.string(),
    techs: z.array(z.string()),
    highlights: z.array(z.string()),
    order: z.number().default(99),
  }),
});

export const collections = { projects, experience };

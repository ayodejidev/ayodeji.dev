import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const httpsUrl = z.url().refine((value) => value.startsWith('https://'), 'Use an HTTPS URL');
const sitePath = z.string().regex(/^\/(?!\/)[a-z0-9/_-]*(?:#[a-z0-9_-]+)?$/u, 'Use a site-relative path');
const topic = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u, 'Use a lowercase topic slug');
const uniqueList = <T extends z.ZodType>(item: T) => z.array(item).default([]).superRefine((values, context) => {
  if (new Set(values).size !== values.length) context.addIssue({ code: 'custom', message: 'Values must be unique' });
});
const tags = uniqueList(topic);
const aliases = uniqueList(sitePath);
const related = uniqueList(sitePath);
const entryId = ({ entry }: { entry: string }) => entry.replace(/\/index\.md$/u, '');

const blog = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/blog', generateId: entryId }),
  schema: ({ image }) => z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().trim().min(1).default('Ayodeji Ogundare'),
    tags,
    aliases,
    related,
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    cover: image().optional(),
    coverAlt: z.string().trim().min(1).optional(),
    originalUrl: httpsUrl.optional(),
    readingMinutes: z.number().int().positive().optional(),
  }).superRefine((data, context) => {
    if (data.cover && !data.coverAlt) context.addIssue({ code: 'custom', path: ['coverAlt'], message: 'Cover images require useful alternative text' });
    if (data.updatedAt && data.updatedAt < data.publishedAt) context.addIssue({ code: 'custom', path: ['updatedAt'], message: 'updatedAt cannot precede publishedAt' });
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/events', generateId: entryId }),
  schema: ({ image }) => z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    date: z.coerce.date(),
    location: z.string().trim().min(1),
    event: z.string().trim().min(1),
    tags,
    aliases,
    related,
    cover: image().optional(),
    coverAlt: z.string().trim().min(1).optional(),
    slidesUrl: httpsUrl.optional(),
    videoUrl: httpsUrl.optional(),
    eventUrl: httpsUrl.optional(),
    draft: z.boolean().default(true),
  }).superRefine((data, context) => {
    if (data.cover && !data.coverAlt) context.addIssue({ code: 'custom', path: ['coverAlt'], message: 'Cover images require useful alternative text' });
  }),
});

const featured = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/featured', generateId: entryId }),
  schema: ({ image }) => z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    date: z.coerce.date(),
    type: z.enum(['article', 'interview', 'meetup', 'podcast', 'video', 'other']),
    url: httpsUrl,
    publisher: z.string().trim().min(1).optional(),
    image: image().optional(),
    imageAlt: z.string().trim().min(1).optional(),
    tags,
    related,
    draft: z.boolean().default(true),
  }).superRefine((data, context) => {
    if (data.image && !data.imageAlt) context.addIssue({ code: 'custom', path: ['imageAlt'], message: 'Images require useful alternative text' });
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    eyebrow: z.string().trim().min(1).optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/projects', generateId: entryId }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    tags,
    aliases,
    related,
    link: httpsUrl,
    github: httpsUrl.optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
  }),
});

export const collections = { blog, events, featured, pages, projects };

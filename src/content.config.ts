import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const fotoSchema = z.object({
  label: z.string(),
  ariaLabel: z.string(),
  orientatie: z.enum(['landscape', 'portrait', 'wide', 'square']).default('landscape'),
  meta: z.string(),
});

const diensten = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/diensten' }),
  schema: z.object({
    titel: z.string(),
    paginaTitel: z.string(),
    metaOmschrijving: z.string().max(180),
    volgorde: z.number().int(),
    kop: z.string(),
    intro: z.string(),
    kaart: z.object({
      titel: z.string(),
      tekst: z.string(),
      linkLabel: z.string(),
    }),
    stappen: z.object({
      eyebrow: z.string(),
      titel: z.string(),
      items: z
        .array(z.object({ titel: z.string(), tekst: z.string() }))
        .min(3)
        .max(4),
    }),
    praktisch: z.object({
      eyebrow: z.string(),
      titel: z.string(),
      lead: z.string().optional(),
      items: z.array(z.object({ titel: z.string(), tekst: z.string() })).optional(),
    }),
    foto: fotoSchema,
    cta: z.object({ eyebrow: z.string(), titel: z.string() }),
  }),
});

const paginaHome = defineCollection({
  loader: glob({ pattern: 'home.md', base: './src/content/paginas' }),
  schema: z.object({
    paginaTitel: z.string(),
    metaOmschrijving: z.string().max(180),
    hero: z.object({
      eyebrow: z.string(),
      titelRegels: z.array(z.string()).min(1),
      support: z.string(),
      secundaireKnop: z.string(),
      foto: fotoSchema,
    }),
    diensten: z.object({ eyebrow: z.string(), titel: z.string() }),
    overOns: z.object({
      eyebrow: z.string(),
      titel: z.string(),
      linkLabel: z.string(),
      foto: fotoSchema,
    }),
  }),
});

const paginaOverOns = defineCollection({
  loader: glob({ pattern: 'over-ons.md', base: './src/content/paginas' }),
  schema: z.object({
    paginaTitel: z.string(),
    metaOmschrijving: z.string().max(180),
    kop: z.string(),
    intro: z.string(),
    fotoEntree: fotoSchema,
    bezoek: z.object({
      eyebrow: z.string(),
      titel: z.string(),
      tekst: z.string(),
      linkLabel: z.string(),
      foto: fotoSchema,
    }),
  }),
});

export const collections = { diensten, paginaHome, paginaOverOns };

# Marco Trento Portfolio (Astro)

This portfolio is now migrated to **Astro** with a Markdown-based blog.

## Run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Structure

- `src/pages/index.astro` -> Home
- `src/pages/blog/index.astro` -> Blog listing
- `src/pages/blog/[slug].astro` -> Blog article page
- `src/pages/contact.astro` -> Contact
- `src/content/blog/*.md` -> Markdown articles
- `src/content/config.ts` -> Blog content schema
- `public/css/styles.css` -> Site styles
- `public/js/main.js` -> Shared interactions
- `public/assets/*` -> Images/assets

## Writing new blog posts

Create a new file in `src/content/blog/`:

```md
---
title: "Post title"
description: "Short preview text"
date: 2026-04-09
tags:
  - Physics
  - Computing
readTime: "6 min read"
---

Your article in Markdown...
```

Astro automatically generates:

- `/blog` (article previews)
- `/blog/<slug>` (full article page)

Where `<slug>` is the markdown filename.

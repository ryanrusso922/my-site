# my-site — Project Context

## What This Is
A personal/portfolio website built with **Next.js 16** + **headless WordPress** as the CMS, deployed to **Cloudflare Pages** as a static site.

## Tech Stack
- Next.js 16 (React 19, TypeScript, static export)
- Tailwind CSS 4 with typography plugin
- WordPress GraphQL (WPGraphQL plugin) for content
- Cloudflare Pages for hosting (Wrangler CLI)

## Project Structure
- `src/app/` — Pages: home, blog, blog/[slug], projects, projects/[slug]
- `src/components/` — Header, Hero, Features, Projects, About, Contact, Footer, ProjectCard, ProjectGallery
- `src/lib/wordpress.ts` — WordPress GraphQL integration with mock data fallback

## WordPress CMS
- GraphQL endpoint: `https://ryanr324.sg-host.com/graphql`
- REST API: `https://ryanr324.sg-host.com/wp-json/wp/v2`
- Content types: Posts (blog), Projects (portfolio with ACF fields), Pages
- Falls back to mock data if WordPress is unavailable

## Environment Variables (.env.local)
```
WORDPRESS_API_URL=https://ryanr324.sg-host.com/wp-json/wp/v2
WORDPRESS_GRAPHQL_URL=https://ryanr324.sg-host.com/graphql
```

## Commands
- `npm run dev` — Local dev server (port 3000)
- `npm run build` — Static build to `out/`
- `npm run deploy` — Build + deploy to Cloudflare Pages

## Current Status
- Homepage with hero, features, projects preview, about, contact form
- Blog listing + detail pages working
- Projects listing + detail pages with gallery/lightbox
- Deployed to Cloudflare Pages
- Contact form logs submissions but has no backend yet (TODO)

## Owner
Ryan Russo

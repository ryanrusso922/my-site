# my-site — Project Context

## What This Is
A personal/portfolio website built with **Next.js 16** + **headless WordPress** as the CMS, deployed to **Cloudflare Pages** as a static site.

## Tech Stack
- Next.js 16 (React 19, TypeScript, static export)
- Tailwind CSS 4 with typography plugin
- WordPress GraphQL (WPGraphQL plugin) for content
- Cloudflare Pages for hosting (Wrangler CLI direct upload)

## Live URLs
- **Site:** https://my-site-ch9.pages.dev
- **WordPress admin:** https://ryanr324.sg-host.com/wp-admin
- **GitHub repo:** https://github.com/ryanrusso922/my-site

## Project Structure
- `src/app/` — Pages: home, blog, blog/[slug], projects, projects/[slug]
- `src/components/` — Header, Hero, Features, Projects, About, Contact, Footer, ProjectCard, ProjectGallery
- `src/lib/wordpress.ts` — WordPress GraphQL integration with data normalization + mock data fallback

## WordPress CMS
- GraphQL endpoint: `https://ryanr324.sg-host.com/graphql`
- REST API: `https://ryanr324.sg-host.com/wp-json/wp/v2`
- Content types: Posts (blog), Projects (portfolio with ACF fields), Pages
- **ACF Field Group "Project Fields"** is set up with 8 fields: Client Name, Project URL, Technologies Used, Project Date, Project Status, Testimonial Quote, Testimonial Author, Gallery Images
- ACF fields are exposed to GraphQL as `projectFields`
- `wordpress.ts` has a `normalizeProject()` function that converts GraphQL data (status array→string, ISO date→YYYY-MM, gallery connection→flat array)
- Falls back to mock data if WordPress is unavailable

## Environment Variables (.env.local)
```
WORDPRESS_API_URL=https://ryanr324.sg-host.com/wp-json/wp/v2
WORDPRESS_GRAPHQL_URL=https://ryanr324.sg-host.com/graphql
```

## Commands
- `npm run dev` — Local dev server (port 3000)
- `npm run build` — Static build to `out/`
- `npx wrangler pages deploy out --project-name my-site --commit-dirty=true` — Deploy to Cloudflare Pages

## Current Status
- Homepage with hero, features, projects preview, about, contact form ✅
- Blog listing + detail pages working ✅
- Projects listing + detail pages with gallery/lightbox ✅
- ACF fields set up in WordPress for Projects ✅
- 1 real project ("Ground Up Websites Portfolio") published in WordPress ✅
- Deployed to Cloudflare Pages ✅
- Contact form logs submissions but has no backend yet (TODO)

## TODO — Where We Left Off (March 10, 2026)
**Auto-deploy from WordPress → Cloudflare Pages is partially set up.**

A GitHub Actions workflow exists at `.github/workflows/deploy.yml` that builds and deploys the site. It triggers on:
1. Push to `main` branch (code changes)
2. `repository_dispatch` event type `wordpress_update` (WordPress content changes)

### Remaining steps to finish auto-deploy:

**Step 1: Create Cloudflare API token**
- Go to https://dash.cloudflare.com/profile/api-tokens
- Use the "Edit Cloudflare Workers" template
- Name it "my-site GitHub Actions Deploy"
- Create and copy the token

**Step 2: Add 4 secrets to GitHub repo**
- Go to https://github.com/ryanrusso922/my-site/settings/secrets/actions
- Add: `CLOUDFLARE_API_TOKEN` (from Step 1)
- Add: `CLOUDFLARE_ACCOUNT_ID` = `92efdf3265d65cb3f6610f591c2f1d39`
- Add: `WORDPRESS_API_URL` = `https://ryanr324.sg-host.com/wp-json/wp/v2`
- Add: `WORDPRESS_GRAPHQL_URL` = `https://ryanr324.sg-host.com/graphql`

**Step 3: Create GitHub personal access token for WordPress**
- Go to https://github.com/settings/tokens?type=beta
- Name: `wordpress-deploy-hook`
- Repository access: Only `my-site`
- Permissions: Contents (Read), Actions (Write)
- Copy the token

**Step 4: Set up WordPress webhook**
- Install a plugin or custom snippet in WordPress that POSTs to `https://api.github.com/repos/ryanrusso922/my-site/dispatches` with body `{"event_type":"wordpress_update"}` and the GitHub token as Bearer auth whenever a project/post is published or updated.

## Owner
Ryan Russo

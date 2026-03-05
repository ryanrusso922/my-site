import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const mockPosts: Record<string, { title: string; content: string; date: string }> = {
  "getting-started-with-headless-wordpress": {
    title: "Getting Started with Headless WordPress",
    content:
      "<p>Headless WordPress separates the content management backend from the frontend presentation layer. This guide walks you through setting up WordPress as a headless CMS.</p><h2>Step 1: Install WordPress</h2><p>Set up a standard WordPress installation on your server or use a managed hosting provider.</p><h2>Step 2: Enable the REST API</h2><p>The REST API is enabled by default in modern WordPress. You can access it at <code>/wp-json/wp/v2/</code>.</p><h2>Step 3: Connect your frontend</h2><p>Use the fetch API or a library like SWR to consume WordPress data in your Next.js application.</p>",
    date: "2026-03-01T10:00:00",
  },
  "why-cloudflare-pages": {
    title: "Why Cloudflare Pages for Your Next Project",
    content:
      "<p>Cloudflare Pages offers a powerful platform for deploying static and server-rendered sites with global edge delivery.</p><h2>Global Performance</h2><p>With 300+ data centers worldwide, your site is always close to your visitors.</p><h2>Zero Config Deploys</h2><p>Connect your GitHub repo and deploy automatically on every push.</p>",
    date: "2026-02-25T10:00:00",
  },
  "nextjs-and-wordpress-best-practices": {
    title: "Next.js + WordPress: Best Practices",
    content:
      "<p>Building a production headless WordPress site with Next.js requires some patterns and practices for optimal results.</p><h2>Use ISR</h2><p>Incremental Static Regeneration lets you update static content without rebuilding your entire site.</p><h2>Cache API Responses</h2><p>Use Next.js data caching to avoid unnecessary API calls to your WordPress backend.</p>",
    date: "2026-02-20T10:00:00",
  },
};

async function getPost(slug: string) {
  if (process.env.WORDPRESS_API_URL) {
    const { getPostBySlug } = await import("@/lib/wordpress");
    return getPostBySlug(slug);
  }
  const mock = mockPosts[slug];
  if (!mock) return null;
  return {
    title: { rendered: mock.title },
    content: { rendered: mock.content },
    date: mock.date,
    slug,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  return { title: `${post.title.rendered} | MySite` };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white px-6 pt-32 pb-24 dark:bg-zinc-950">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            &larr; Back to blog
          </Link>
          <time className="block text-sm text-zinc-500">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-2 mb-8 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {post.title.rendered}
          </h1>
          <div
            className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-indigo-600 dark:prose-a:text-indigo-400"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}

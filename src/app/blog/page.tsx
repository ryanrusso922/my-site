import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock posts for development — replaced by WordPress API when WORDPRESS_API_URL is set
const mockPosts = [
  {
    id: 1,
    slug: "getting-started-with-headless-wordpress",
    title: { rendered: "Getting Started with Headless WordPress" },
    excerpt: { rendered: "<p>Learn how to set up WordPress as a headless CMS and connect it to a modern frontend framework.</p>" },
    date: "2026-03-01T10:00:00",
  },
  {
    id: 2,
    slug: "why-cloudflare-pages",
    title: { rendered: "Why Cloudflare Pages for Your Next Project" },
    excerpt: { rendered: "<p>Discover the benefits of deploying your site to Cloudflare's global edge network.</p>" },
    date: "2026-02-25T10:00:00",
  },
  {
    id: 3,
    slug: "nextjs-and-wordpress-best-practices",
    title: { rendered: "Next.js + WordPress: Best Practices" },
    excerpt: { rendered: "<p>Tips and patterns for building a production-ready headless WordPress site with Next.js.</p>" },
    date: "2026-02-20T10:00:00",
  },
];

async function getPosts() {
  if (process.env.WORDPRESS_API_URL) {
    const { getPosts } = await import("@/lib/wordpress");
    return getPosts();
  }
  return mockPosts;
}

export const metadata = {
  title: "Blog | MySite",
  description: "Latest posts and articles",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white px-6 pt-32 pb-24 dark:bg-zinc-950">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Blog
          </h1>
          <p className="mb-12 text-lg text-zinc-600 dark:text-zinc-400">
            Latest posts and updates.
          </p>
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-zinc-200 p-8 transition-shadow hover:shadow-lg dark:border-zinc-800"
              >
                <time className="text-sm text-zinc-500">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-white">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-indigo-500 dark:hover:text-indigo-400"
                  >
                    {post.title.rendered}
                  </Link>
                </h2>
                <div
                  className="mt-3 text-zinc-600 dark:text-zinc-400"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  Read more &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

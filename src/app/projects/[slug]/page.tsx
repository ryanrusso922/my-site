import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import type { WPProject } from "@/lib/wordpress";

const mockProjects: Record<string, WPProject> = {
  "ecommerce-platform-redesign": {
    slug: "ecommerce-platform-redesign",
    title: "E-Commerce Platform Redesign",
    date: "2026-02-15T10:00:00",
    excerpt:
      "<p>A complete redesign of an e-commerce platform, improving conversion rates by 40% through modern UX patterns.</p>",
    content:
      "<h2>Project Overview</h2><p>This project involved a complete overhaul of the client's existing e-commerce platform. The goal was to modernize the user experience, improve performance, and increase conversion rates.</p><h2>The Challenge</h2><p>The existing platform was built on legacy technology and suffered from slow page loads, poor mobile experience, and a confusing checkout flow. Cart abandonment rates were at 78%.</p><h2>Our Approach</h2><p>We rebuilt the entire frontend using Next.js and TypeScript, implementing server-side rendering for optimal performance. The new design features a streamlined checkout process, real-time inventory updates, and a fully responsive layout.</p><h2>Results</h2><p>After launch, conversion rates improved by 40%, page load times decreased by 60%, and mobile sales increased by 55%. The client saw a significant return on investment within the first quarter.</p>",
    featuredImage: null,
    projectFields: {
      clientName: "TechRetail Co.",
      projectUrl: "https://example.com",
      technologiesUsed: "Next.js, TypeScript, Tailwind CSS, Stripe, PostgreSQL",
      testimonialQuote:
        "The team delivered an exceptional e-commerce experience that exceeded our expectations. Our conversion rates have never been higher.",
      testimonialAuthor: "Sarah Chen, CTO at TechRetail Co.",
      projectDate: "2026-02",
      projectStatus: "Completed",
      galleryImages: null,
    },
  },
  "saas-dashboard-application": {
    slug: "saas-dashboard-application",
    title: "SaaS Dashboard Application",
    date: "2026-01-20T10:00:00",
    excerpt:
      "<p>Built a real-time analytics dashboard for a SaaS startup, handling millions of data points with sub-second response times.</p>",
    content:
      "<h2>Project Overview</h2><p>DataFlow Analytics needed a powerful, real-time dashboard that could process and visualize millions of data points without lag. We built a custom solution from the ground up.</p><h2>The Challenge</h2><p>The client's existing analytics tool couldn't handle the volume of data their platform generated. Users experienced long load times and stale data, leading to churn.</p><h2>Our Approach</h2><p>We implemented a WebSocket-based real-time data pipeline with Redis caching for frequently accessed metrics. The frontend uses D3.js for interactive, performant visualizations that update in real-time.</p><h2>Results</h2><p>The new dashboard handles 10x more data points with sub-second response times. User engagement with analytics features increased by 200%, and the client reduced churn by 15%.</p>",
    featuredImage: null,
    projectFields: {
      clientName: "DataFlow Analytics",
      projectUrl: "https://example.com",
      technologiesUsed: "React, D3.js, Node.js, WebSockets, Redis",
      testimonialQuote:
        "Our users love the new dashboard. The real-time updates and smooth visualizations have completely transformed how they interact with their data.",
      testimonialAuthor: "Mike Johnson, CEO at DataFlow Analytics",
      projectDate: "2026-01",
      projectStatus: "Active",
      galleryImages: null,
    },
  },
  "nonprofit-website-rebuild": {
    slug: "nonprofit-website-rebuild",
    title: "Nonprofit Website Rebuild",
    date: "2025-12-10T10:00:00",
    excerpt:
      "<p>Modernized a nonprofit&apos;s web presence with a headless WordPress setup, increasing donations by 25%.</p>",
    content:
      "<h2>Project Overview</h2><p>GreenFuture Foundation needed a modern, fast website that could effectively communicate their mission and make it easy for supporters to donate and get involved.</p><h2>The Challenge</h2><p>Their existing WordPress site was slow, difficult to update, and had a poor donation experience. The site didn't reflect the professionalism of their organization.</p><h2>Our Approach</h2><p>We implemented a headless WordPress architecture using WPGraphQL for content management and Next.js for the frontend, deployed on Cloudflare Pages for global performance. The donation flow was completely redesigned for simplicity.</p><h2>Results</h2><p>Online donations increased by 25% within the first month. Page load times improved by 70%, and the content team can now update the site without developer assistance.</p>",
    featuredImage: null,
    projectFields: {
      clientName: "GreenFuture Foundation",
      projectUrl: "https://example.com",
      technologiesUsed: "WordPress, Next.js, Cloudflare Pages, WPGraphQL",
      testimonialQuote:
        "The new website perfectly captures our mission and has made it so much easier for our supporters to contribute. We couldn't be happier.",
      testimonialAuthor: "Lisa Park, Director at GreenFuture Foundation",
      projectDate: "2025-12",
      projectStatus: "Completed",
      galleryImages: null,
    },
  },
};

async function getProject(slug: string): Promise<WPProject | null> {
  if (process.env.WORDPRESS_GRAPHQL_URL) {
    try {
      const { getProjectBySlug } = await import("@/lib/wordpress");
      const wpProject = await getProjectBySlug(slug);
      if (wpProject) return wpProject;
    } catch {
      // GraphQL unavailable — fall through to mock
    }
  }

  return mockProjects[slug] ?? null;
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];

  if (process.env.WORDPRESS_GRAPHQL_URL) {
    try {
      const { getProjects } = await import("@/lib/wordpress");
      const projects = await getProjects(50);
      slugs.push(...projects.map((p) => ({ slug: p.slug })));
    } catch {
      // GraphQL unavailable at build time — skip
    }
  }

  // Always include mock projects so the route is never empty
  for (const slug of Object.keys(mockProjects)) {
    if (!slugs.some((s) => s.slug === slug)) {
      slugs.push({ slug });
    }
  }

  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Not Found" };
  return { title: `${project.title} | MySite` };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const techs =
    project.projectFields?.technologiesUsed
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) ?? [];

  const statusColor =
    project.projectFields?.projectStatus === "Completed"
      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      : project.projectFields?.projectStatus === "Active"
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white px-6 pt-32 pb-24 dark:bg-zinc-950">
        <div className="mx-auto max-w-5xl">
          {/* Back link */}
          <Link
            href="/projects"
            className="mb-8 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            &larr; Back to projects
          </Link>

          {/* Featured image */}
          {project.featuredImage && (
            <div className="mb-10 overflow-hidden rounded-2xl">
              <img
                src={project.featuredImage.node.sourceUrl}
                alt={project.featuredImage.node.altText || project.title}
                className="w-full object-cover"
              />
            </div>
          )}

          {/* Two-column layout */}
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {project.title}
              </h1>
              <div
                className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-indigo-600 dark:prose-a:text-indigo-400"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:col-span-1">
              <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                {project.projectFields?.clientName && (
                  <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Client
                    </p>
                    <p className="mt-1 font-medium text-zinc-900 dark:text-white">
                      {project.projectFields.clientName}
                    </p>
                  </div>
                )}

                {project.projectFields?.projectDate && (
                  <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Date
                    </p>
                    <p className="mt-1 font-medium text-zinc-900 dark:text-white">
                      {project.projectFields.projectDate}
                    </p>
                  </div>
                )}

                {project.projectFields?.projectStatus && (
                  <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Status
                    </p>
                    <span
                      className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-medium ${statusColor}`}
                    >
                      {project.projectFields.projectStatus}
                    </span>
                  </div>
                )}

                {project.projectFields?.projectUrl && (
                  <a
                    href={project.projectFields.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    Visit Site &rarr;
                  </a>
                )}
              </div>

              {/* Technologies */}
              {techs.length > 0 && (
                <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-zinc-100 px-2.5 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Testimonial */}
          {project.projectFields?.testimonialQuote && (
            <blockquote className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-lg italic text-zinc-700 dark:text-zinc-300">
                &ldquo;{project.projectFields.testimonialQuote}&rdquo;
              </p>
              {project.projectFields.testimonialAuthor && (
                <cite className="mt-4 block text-sm font-medium not-italic text-zinc-900 dark:text-white">
                  &mdash; {project.projectFields.testimonialAuthor}
                </cite>
              )}
            </blockquote>
          )}

          {/* Gallery */}
          {project.projectFields?.galleryImages &&
            project.projectFields.galleryImages.length > 0 && (
              <div className="mt-16">
                <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
                  Gallery
                </h2>
                <ProjectGallery
                  images={project.projectFields.galleryImages}
                />
              </div>
            )}
        </div>
      </main>
      <Footer />
    </>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import type { WPProject } from "@/lib/wordpress";

const mockProjects: WPProject[] = [
  {
    slug: "ecommerce-platform-redesign",
    title: "E-Commerce Platform Redesign",
    date: "2026-02-15T10:00:00",
    excerpt:
      "<p>A complete redesign of an e-commerce platform, improving conversion rates by 40% through modern UX patterns.</p>",
    content: "",
    featuredImage: null,
    projectFields: {
      clientName: "TechRetail Co.",
      projectUrl: "https://example.com",
      technologiesUsed: "Next.js, TypeScript, Tailwind CSS, Stripe, PostgreSQL",
      testimonialQuote: null,
      testimonialAuthor: null,
      projectDate: "2026-02",
      projectStatus: "Completed",
      galleryImages: null,
    },
  },
  {
    slug: "saas-dashboard-application",
    title: "SaaS Dashboard Application",
    date: "2026-01-20T10:00:00",
    excerpt:
      "<p>Built a real-time analytics dashboard for a SaaS startup, handling millions of data points with sub-second response times.</p>",
    content: "",
    featuredImage: null,
    projectFields: {
      clientName: "DataFlow Analytics",
      projectUrl: "https://example.com",
      technologiesUsed: "React, D3.js, Node.js, WebSockets, Redis",
      testimonialQuote: null,
      testimonialAuthor: null,
      projectDate: "2026-01",
      projectStatus: "Active",
      galleryImages: null,
    },
  },
  {
    slug: "nonprofit-website-rebuild",
    title: "Nonprofit Website Rebuild",
    date: "2025-12-10T10:00:00",
    excerpt:
      "<p>Modernized a nonprofit&apos;s web presence with a headless WordPress setup, increasing donations by 25%.</p>",
    content: "",
    featuredImage: null,
    projectFields: {
      clientName: "GreenFuture Foundation",
      projectUrl: "https://example.com",
      technologiesUsed: "WordPress, Next.js, Cloudflare Pages, WPGraphQL",
      testimonialQuote: null,
      testimonialAuthor: null,
      projectDate: "2025-12",
      projectStatus: "Completed",
      galleryImages: null,
    },
  },
];

async function fetchProjects() {
  if (process.env.WORDPRESS_GRAPHQL_URL) {
    try {
      const { getProjects } = await import("@/lib/wordpress");
      const projects = await getProjects(50);
      if (projects.length > 0) return projects;
    } catch {
      // GraphQL unavailable — fall through to mock
    }
  }
  return mockProjects;
}

export const metadata = {
  title: "Projects | MySite",
  description: "A showcase of our recent work and case studies",
};

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white px-6 pt-32 pb-24 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Projects
          </h1>
          <p className="mb-12 text-lg text-zinc-600 dark:text-zinc-400">
            A showcase of our recent work and case studies.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

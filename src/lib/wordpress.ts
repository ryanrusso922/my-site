const WP_API_URL = process.env.WORDPRESS_API_URL || "https://your-wordpress-site.com/wp-json/wp/v2";

export interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  date: string;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WPPage {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  acf?: Record<string, unknown>;
}

async function fetchAPI<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${WP_API_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function getPosts(perPage = 10): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>("/posts", {
    per_page: String(perPage),
    _embed: "true",
  });
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchAPI<WPPost[]>("/posts", {
    slug,
    _embed: "true",
  });
  return posts[0] || null;
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await fetchAPI<WPPage[]>("/pages", { slug });
  return pages[0] || null;
}

export async function getPages(): Promise<WPPage[]> {
  return fetchAPI<WPPage[]>("/pages");
}

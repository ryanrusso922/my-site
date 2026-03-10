const GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL || "https://ryanr324.sg-host.com/graphql";

// ---------- Types ----------

export interface WPPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
  // ACF custom fields (added via WPGraphQL for ACF)
  acfFields?: Record<string, unknown>;
}

export interface WPProject {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
  projectFields: {
    clientName: string | null;
    projectUrl: string | null;
    technologiesUsed: string | null;
    testimonialQuote: string | null;
    testimonialAuthor: string | null;
    projectDate: string | null;
    projectStatus: string | null;
    galleryImages: Array<{
      sourceUrl: string;
      altText: string;
    }> | null;
  } | null;
}

export interface WPPage {
  slug: string;
  title: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
}

// ---------- GraphQL Fetch ----------

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`GraphQL error: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;

  if (json.errors?.length) {
    throw new Error(`GraphQL error: ${json.errors[0].message}`);
  }

  return json.data;
}

// ---------- Queries ----------

const POST_FIELDS = `
  slug
  title
  date
  excerpt
  content
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
`;

export async function getPosts(first = 10): Promise<WPPost[]> {
  const data = await fetchGraphQL<{ posts: { nodes: WPPost[] } }>(
    `query GetPosts($first: Int!) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          ${POST_FIELDS}
        }
      }
    }`,
    { first }
  );
  return data.posts.nodes;
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const data = await fetchGraphQL<{ post: WPPost | null }>(
    `query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        ${POST_FIELDS}
      }
    }`,
    { slug }
  );
  return data.post;
}

// ---------- Project Queries ----------

const PROJECT_FIELDS = `
  slug
  title
  date
  excerpt
  content
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  projectFields {
    clientName
    projectUrl
    technologiesUsed
    testimonialQuote
    testimonialAuthor
    projectDate
    projectStatus
    galleryImages {
      nodes {
        sourceUrl
        altText
      }
    }
  }
`;

// Normalize ACF fields from GraphQL to match frontend expectations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeProject(project: any): WPProject {
  if (!project?.projectFields) return project;
  const pf = project.projectFields;

  // projectStatus comes as an array from ACF select — pick the first value and capitalize
  let status = pf.projectStatus;
  if (Array.isArray(status)) {
    status = status[0] || null;
  }
  if (typeof status === "string") {
    status = status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ");
  }

  // projectDate comes as ISO timestamp — format as YYYY-MM
  let date = pf.projectDate;
  if (date && date.includes("T")) {
    date = date.slice(0, 7); // "2026-03-07T00:00:00+00:00" → "2026-03"
  }

  // galleryImages comes as { nodes: [...] } connection — flatten to array
  let gallery = pf.galleryImages;
  if (gallery && gallery.nodes) {
    gallery = gallery.nodes;
  }

  return {
    ...project,
    projectFields: {
      ...pf,
      projectStatus: status,
      projectDate: date,
      galleryImages: gallery,
    },
  };
}

export async function getProjects(first = 10): Promise<WPProject[]> {
  const data = await fetchGraphQL<{ projects: { nodes: WPProject[] } }>(
    `query GetProjects($first: Int!) {
      projects(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          ${PROJECT_FIELDS}
        }
      }
    }`,
    { first }
  );
  return data.projects.nodes.map(normalizeProject);
}

export async function getProjectBySlug(slug: string): Promise<WPProject | null> {
  const data = await fetchGraphQL<{ project: WPProject | null }>(
    `query GetProject($slug: ID!) {
      project(id: $slug, idType: SLUG) {
        ${PROJECT_FIELDS}
      }
    }`,
    { slug }
  );
  return data.project ? normalizeProject(data.project) : null;
}

// ---------- Page Queries ----------

export async function getPages(): Promise<WPPage[]> {
  const data = await fetchGraphQL<{ pages: { nodes: WPPage[] } }>(
    `query GetPages {
      pages(first: 50) {
        nodes {
          slug
          title
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }`
  );
  return data.pages.nodes;
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const data = await fetchGraphQL<{ page: WPPage | null }>(
    `query GetPage($slug: ID!) {
      page(id: $slug, idType: URI) {
        slug
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }`,
    { slug }
  );
  return data.page;
}

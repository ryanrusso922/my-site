export default function About() {
  return (
    <section id="about" className="bg-white px-6 py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Content meets performance
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              This site uses WordPress as a headless CMS — you get the full
              editing experience of WordPress while your visitors get a blazing
              fast frontend powered by Next.js.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Pages are statically generated and served from Cloudflare&apos;s global
              edge network. When you publish new content in WordPress, the site
              automatically revalidates and rebuilds only what changed.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">300+</div>
                <div className="text-sm text-zinc-500">Edge locations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">&lt;50ms</div>
                <div className="text-sm text-zinc-500">Time to first byte</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white">100</div>
                <div className="text-sm text-zinc-500">Lighthouse score</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-zinc-500">architecture</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                <div className="text-indigo-500">WordPress (CMS)</div>
                <div className="text-zinc-400">{"  ├── "} REST API / WPGraphQL</div>
                <div className="text-zinc-400">{"  └── "} Content management</div>
                <div className="mt-2 text-zinc-400">{"       ↓"}</div>
                <div className="mt-2 text-emerald-500">Next.js (Frontend)</div>
                <div className="text-zinc-400">{"  ├── "} Static generation (SSG)</div>
                <div className="text-zinc-400">{"  ├── "} Incremental revalidation</div>
                <div className="text-zinc-400">{"  └── "} React components</div>
                <div className="mt-2 text-zinc-400">{"       ↓"}</div>
                <div className="mt-2 text-orange-500">Cloudflare Pages</div>
                <div className="text-zinc-400">{"  ├── "} Global CDN (300+ PoPs)</div>
                <div className="text-zinc-400">{"  └── "} Edge functions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

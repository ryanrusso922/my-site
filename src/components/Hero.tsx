import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 pt-16 dark:bg-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.08),transparent_50%)]" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Powered by WordPress &amp; Next.js
        </div>
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white sm:text-6xl lg:text-7xl">
          Build faster.{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
            Ship smarter.
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          A modern headless website combining the power of WordPress content
          management with the speed of Next.js and Cloudflare Pages.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#features"
            className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-700 hover:shadow-lg dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Explore Features
          </Link>
          <Link
            href="#about"
            className="rounded-full border border-zinc-300 px-8 py-3 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

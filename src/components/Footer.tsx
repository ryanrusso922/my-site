import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white px-6 py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
            MySite
          </Link>
          <nav className="flex gap-6">
            <Link href="#features" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
              Features
            </Link>
            <Link href="#about" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
              About
            </Link>
            <Link href="/blog" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
              Blog
            </Link>
            <Link href="#contact" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
              Contact
            </Link>
          </nav>
          <p className="text-sm text-zinc-400">
            &copy; {new Date().getFullYear()} MySite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

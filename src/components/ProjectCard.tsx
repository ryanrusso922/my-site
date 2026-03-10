import Link from "next/link";
import type { WPProject } from "@/lib/wordpress";

export default function ProjectCard({ project }: { project: WPProject }) {
  const techs =
    project.projectFields?.technologiesUsed
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) ?? [];

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
      <div className="aspect-video bg-gradient-to-br from-indigo-100 to-emerald-100 dark:from-indigo-950 dark:to-emerald-950">
        {project.featuredImage && (
          <img
            src={project.featuredImage.node.sourceUrl}
            alt={project.featuredImage.node.altText || project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2">
          {project.projectFields?.projectStatus && (
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                project.projectFields.projectStatus === "Completed"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : project.projectFields.projectStatus === "Active"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
              }`}
            >
              {project.projectFields.projectStatus}
            </span>
          )}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-white">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-indigo-500 dark:hover:text-indigo-400"
          >
            {project.title}
          </Link>
        </h3>
        {project.projectFields?.clientName && (
          <p className="mt-1 text-sm text-zinc-500">
            {project.projectFields.clientName}
          </p>
        )}
        <div
          className="mt-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400"
          dangerouslySetInnerHTML={{ __html: project.excerpt }}
        />
        {techs.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {techs.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {tech}
              </span>
            ))}
            {techs.length > 4 && (
              <span className="text-xs text-zinc-400">
                +{techs.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

interface GalleryImage {
  sourceUrl: string;
  altText: string;
}

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="group overflow-hidden rounded-xl"
          >
            <img
              src={img.sourceUrl}
              alt={img.altText || `Gallery image ${i + 1}`}
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 text-2xl text-white hover:text-zinc-300"
            aria-label="Close"
          >
            &times;
          </button>
          <img
            src={images[selected].sourceUrl}
            alt={images[selected].altText || "Gallery image"}
            className="max-h-[90vh] max-w-full rounded-lg"
          />
        </div>
      )}
    </>
  );
}

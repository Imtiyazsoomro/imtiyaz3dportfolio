import { projects } from "@/data/projects";
import type { Tile, TileSpan } from "@/components/MasonryTile";

// Rhythm of tile sizes repeated down the grid, matching an editorial masonry layout.
const spanPattern: TileSpan[] = [
  "feature",
  "wide",
  "square",
  "square",
  "tall",
  "square",
  "wide",
  "square",
  "tall",
  "square",
  "square",
  "wide",
];

/**
 * Interleaves images from every project so the grid mixes categories,
 * then assigns a size from the span pattern.
 */
export const buildMasonryTiles = (limit = 24): Tile[] => {
  // Only show 3D-related projects on the home grid.
  const threeDProjects = projects.filter((p) => p.category !== "AI-Enhanced Digital Media" && p.category !== "Brand Identity");
  const pools = threeDProjects.map((project) => ({
    project,
    images: project.gallery.length ? project.gallery : [project.coverImage],
  }));

  const flat: { projectId: string; title: string; category: string; image: string }[] = [];
  const maxDepth = Math.max(...pools.map((p) => p.images.length));

  for (let depth = 0; depth < maxDepth; depth++) {
    for (const { project, images } of pools) {
      const image = images[depth];
      if (!image) continue;
      flat.push({
        projectId: project.id,
        title: project.title,
        category: project.category,
        image,
      });
    }
  }

  return flat.slice(0, limit).map((item, index) => ({
    id: `${item.projectId}-${index}`,
    ...item,
    span: spanPattern[index % spanPattern.length],
  }));
};

export const masonryTiles = buildMasonryTiles();

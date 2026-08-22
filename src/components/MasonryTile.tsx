import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LikeButton from "@/components/LikeButton";
import { cn } from "@/lib/utils";

export type TileSpan = "feature" | "wide" | "tall" | "square";

export interface Tile {
  id: string;
  projectId: string;
  title: string;
  category: string;
  image: string;
  span: TileSpan;
}

const spanClasses: Record<TileSpan, string> = {
  feature: "col-span-2 row-span-4",
  wide: "col-span-2 row-span-2",
  tall: "col-span-1 row-span-3",
  square: "col-span-1 row-span-2",
};

interface MasonryTileProps {
  tile: Tile;
  index: number;
}

const MasonryTile = ({ tile, index }: MasonryTileProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      className={cn("relative group overflow-hidden rounded-lg bg-card", spanClasses[tile.span])}
    >
      <Link to={`/project/${tile.projectId}`} className="block w-full h-full">
        <img
          src={tile.image}
          alt={`${tile.title} — ${tile.category}`}
          loading={index > 5 ? "lazy" : "eager"}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:[filter:grayscale(0.85)_contrast(1.05)]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-[10px] uppercase tracking-[0.18em] text-primary font-medium">
            {tile.category}
          </span>
          <h3 className="font-display font-semibold text-foreground text-sm md:text-base mt-1 leading-tight">
            {tile.title}
          </h3>
        </div>
      </Link>

      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
        <LikeButton projectId={tile.projectId} />
      </div>
    </motion.div>
  );
};

export default MasonryTile;

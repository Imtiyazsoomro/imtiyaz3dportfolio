import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useLikes } from "@/hooks/useLikes";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  projectId: string;
  className?: string;
  size?: "sm" | "md";
}

const LikeButton = ({ projectId, className, size = "sm" }: LikeButtonProps) => {
  const { counts, liked, toggleLike } = useLikes();
  const count = counts[projectId] ?? 0;
  const isLiked = !!liked[projectId];

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.88 }}
      aria-pressed={isLiked}
      aria-label={isLiked ? `Unlike, ${count} likes` : `Like, ${count} likes`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleLike(projectId);
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 backdrop-blur-md transition-colors hover:border-primary/60",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-4 py-2 text-sm",
        className
      )}
    >
      <Heart
        className={cn(
          size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4",
          "transition-colors",
          isLiked ? "fill-primary text-primary" : "text-muted-foreground"
        )}
      />
      <span className={cn("font-medium tabular-nums", isLiked ? "text-primary" : "text-muted-foreground")}>
        {count}
      </span>
    </motion.button>
  );
};

export default LikeButton;

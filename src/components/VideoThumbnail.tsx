import { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface VideoThumbnailProps {
  src: string;
  caption?: string;
  onClick: () => void;
  variant?: "default" | "wedding";
}

const VideoThumbnail = ({ src, caption, onClick, variant = "default" }: VideoThumbnailProps) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate thumbnail from video
  useEffect(() => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = src;
    video.muted = true;
    video.playsInline = true;

    const handleLoadedData = () => {
      video.currentTime = 0.5;
    };

    const handleSeeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setThumbnail(dataUrl);
      }
      setIsLoading(false);
      video.remove();
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("seeked", handleSeeked);
    video.load();

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("seeked", handleSeeked);
      video.remove();
    };
  }, [src]);

  const isWedding = variant === "wedding";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer group relative ${
        isWedding 
          ? "rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(251,191,191,0.15)] hover:shadow-[0_0_40px_rgba(251,191,191,0.25)] transition-shadow duration-300" 
          : "rounded-xl overflow-hidden"
      }`}
      onClick={onClick}
    >
      <div className="relative aspect-video bg-card overflow-hidden">
        {/* Thumbnail Image */}
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={caption || "Video thumbnail"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-muted-foreground/30 border-t-primary animate-spin" />
          </div>
        )}

        {/* Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
          isWedding 
            ? "bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70" 
            : "bg-black/30 group-hover:bg-black/40"
        }`}>
          {/* Play Button */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center backdrop-blur-sm ${
              isWedding 
                ? "bg-gradient-to-br from-rose-400/90 to-pink-500/90 shadow-[0_0_25px_rgba(251,113,133,0.5)]" 
                : "bg-primary/90"
            }`}
          >
            <Play className={`w-6 h-6 md:w-8 md:h-8 ml-1 ${
              isWedding ? "text-white" : "text-primary-foreground"
            }`} />
          </motion.div>
        </div>

        {/* Wedding Glow Border Effect */}
        {isWedding && (
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-rose-300/20 pointer-events-none" />
        )}
      </div>

      {/* Caption */}
      {caption && (
        <div className={`px-4 py-3 ${isWedding ? "bg-card/80 backdrop-blur-sm" : "bg-card"}`}>
          <p className={`text-sm ${isWedding ? "text-rose-200/80" : "text-muted-foreground"} italic`}>
            {caption}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default VideoThumbnail;

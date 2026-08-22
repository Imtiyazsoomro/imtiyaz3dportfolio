import { useState, useRef, useEffect } from "react";
import { Play, Pause, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  src: string;
  caption?: string;
  fallbackPoster?: string;
}

const VideoPlayer = ({ src, caption, fallbackPoster }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate thumbnail from video
  useEffect(() => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.src = src;
    video.muted = true;
    video.playsInline = true;

    const handleLoadedData = () => {
      // Seek to 0.5 seconds to get a better frame
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

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="rounded-xl overflow-hidden bg-card">
      <div className="relative group">
        {/* Video element */}
        <video
          ref={videoRef}
          src={src}
          className="w-full h-auto"
          poster={thumbnail || fallbackPoster}
          onEnded={handleVideoEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          playsInline
        >
          Your browser does not support the video tag.
        </video>

        {/* Loading skeleton */}
        {isLoading && !thumbnail && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-muted-foreground/30 border-t-primary animate-spin" />
          </div>
        )}

        {/* Play/Pause overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaying ? 0 : 1 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity"
          onClick={handlePlayClick}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
            ) : (
              <Play className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground ml-1" />
            )}
          </motion.button>
        </motion.div>

        {/* Controls overlay (visible on hover when playing) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={handlePlayClick}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </button>
            <button
              onClick={handleFullscreen}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <Maximize2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Hidden canvas for thumbnail generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Caption */}
      {caption && (
        <p className="px-4 py-3 text-sm text-muted-foreground italic">
          {caption}
        </p>
      )}
    </div>
  );
};

export default VideoPlayer;

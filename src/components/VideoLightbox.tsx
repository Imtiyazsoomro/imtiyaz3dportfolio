import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoLightboxProps {
  videos: { src: string; caption?: string }[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const VideoLightbox = ({ videos, initialIndex, isOpen, onClose }: VideoLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsPlaying(false);
  }, [initialIndex, isOpen]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    setIsPlaying(false);
  }, [videos.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    setIsPlaying(false);
  }, [videos.length]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handlePrev();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case " ":
          e.preventDefault();
          togglePlay();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext, isPlaying]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
        >
          {/* Top Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-foreground hover:bg-secondary"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-sm text-muted-foreground">
            {currentIndex + 1} / {videos.length}
          </div>

          {/* Navigation Arrows */}
          {videos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 text-foreground hover:bg-secondary w-12 h-12"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 text-foreground hover:bg-secondary w-12 h-12"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}

          {/* Video */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="max-w-[90vw] max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={videos[currentIndex].src}
              className="max-w-full max-h-[75vh] rounded-2xl shadow-2xl"
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              playsInline
              controls
            />

            {/* Caption */}
            {videos[currentIndex].caption && (
              <p className="text-center text-muted-foreground mt-4 text-sm italic">
                {videos[currentIndex].caption}
              </p>
            )}

            {/* Custom Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-primary/90 backdrop-blur-sm pointer-events-auto"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                )}
              </button>
              <button
                onClick={handleFullscreen}
                className="p-3 rounded-full bg-white/20 backdrop-blur-sm pointer-events-auto"
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </motion.div>

          {/* Thumbnails */}
          {videos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2">
              {videos.map((video, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                    setIsPlaying(false);
                  }}
                  className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-secondary flex items-center justify-center ${
                    index === currentIndex
                      ? "border-primary opacity-100 shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                      : "border-transparent opacity-50 hover:opacity-75"
                  }`}
                >
                  <Play className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoLightbox;

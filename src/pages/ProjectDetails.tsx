import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjectById } from "@/data/projects";
import Lightbox from "@/components/Lightbox";
import VideoPlayer from "@/components/VideoPlayer";
import VideoLightbox from "@/components/VideoLightbox";
import VideoThumbnail from "@/components/VideoThumbnail";
import LikeButton from "@/components/LikeButton";
import SEOHead from "@/components/SEOHead";


const ProjectDetails = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);
  const [videoLightboxIndex, setVideoLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const openVideoLightbox = (index: number) => {
    setVideoLightboxIndex(index);
    setVideoLightboxOpen(true);
  };

  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id || "");

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <main className="pt-24 pb-20">
      <SEOHead
        title={`${project.title} — ${project.category}`}
        description={project.description.slice(0, 155)}
        path={`/project/${project.id}`}
      />
      <div className="container px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button asChild variant="ghost" size="sm">
            <Link to="/portfolio">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Portfolio
            </Link>
          </Button>
        </motion.div>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="aspect-[21/9] rounded-2xl overflow-hidden mb-12"
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              {project.category}
            </span>
            <div className="flex flex-wrap items-center gap-4 mt-2 mb-6">
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground">
                {project.title}
              </h1>
              <LikeButton projectId={project.id} size="md" />
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {project.description}
            </p>

            {/* Video Section - Wedding Style for AI-Enhanced Digital Media */}
            {project.videos && project.videos.length > 0 && project.category === "AI-Enhanced Digital Media" && (
              <div className="mt-12">
                <h2 className="font-display font-semibold text-xl text-foreground mb-6">
                  Wedding Videos
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.videos.map((video, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.1 }}
                    >
                      <VideoThumbnail
                        src={video.src}
                        caption={video.caption}
                        onClick={() => openVideoLightbox(index)}
                        variant="wedding"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Section - Default Style for other projects */}
            {project.videos && project.videos.length > 0 && project.category !== "AI-Enhanced Digital Media" && (
              <div className="mt-12">
                <h2 className="font-display font-semibold text-xl text-foreground mb-6">
                  Project Videos
                </h2>
                <div className="space-y-6">
                  {project.videos.map((video, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.1 }}
                    >
                      <VideoPlayer
                        src={video.src}
                        caption={video.caption}
                        fallbackPoster={project.coverImage}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Fallback for single video */}
            {project.video && !project.videos && (
              <div className="mt-12">
                <h2 className="font-display font-semibold text-xl text-foreground mb-6">
                  Project Video
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <VideoPlayer
                    src={project.video}
                    fallbackPoster={project.coverImage}
                  />
                </motion.div>
              </div>
            )}

            {/* Gallery Grid */}
            {project.gallery.length > 1 && (
              <div className="mt-12">
                <h2 className="font-display font-semibold text-xl text-foreground mb-6">
                  Project Gallery
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="rounded-xl overflow-hidden bg-card cursor-pointer group"
                      onClick={() => openLightbox(index)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 text-foreground text-sm font-medium transition-opacity duration-300">
                            Click to enlarge
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-card rounded-xl border border-border p-6 sticky top-28">
              <h3 className="font-display font-semibold text-lg text-foreground mb-6">
                Project Info
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Client</span>
                    <p className="text-foreground font-medium">{project.client}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Tools Used</span>
                    <p className="text-foreground font-medium">{project.tools.join(", ")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Year</span>
                    <p className="text-foreground font-medium">{project.year}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Lightbox */}
      <Lightbox
        images={project.gallery}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
      
      {/* Video Lightbox */}
      {project.videos && (
        <VideoLightbox
          videos={project.videos}
          initialIndex={videoLightboxIndex}
          isOpen={videoLightboxOpen}
          onClose={() => setVideoLightboxOpen(false)}
        />
      )}
    </main>
  );
};

export default ProjectDetails;

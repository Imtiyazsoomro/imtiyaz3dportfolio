import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, Palette, Type, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BrandProject } from "@/data/brandProjects";
import Lightbox from "@/components/Lightbox";

interface BrandShowcaseProps {
  projects: BrandProject[];
}

const ColorSwatch = ({ color }: { color: { name: string; hex: string; hsl: string } }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="w-16 h-16 rounded-xl border border-border shadow-lg"
      style={{ backgroundColor: color.hex }}
    />
    <span className="text-xs font-medium text-foreground">{color.name}</span>
    <span className="text-[10px] text-muted-foreground font-mono">{color.hex}</span>
  </div>
);

const BrandCard = ({ project, index }: { project: BrandProject; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryImages = project.gallery.map((g) => g.src);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      {/* Main Card */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500">
        {/* Bento Grid Header */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          {/* Logo & Identity — Large Cell */}
          <div className="lg:col-span-2 p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              {project.icon && (
                <img src={project.icon} alt="" className="absolute -bottom-10 -right-10 w-48 h-48" />
              )}
            </div>

            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                {project.role}
              </span>
              <h3 className="font-display font-bold text-2xl lg:text-3xl text-foreground mt-3 leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">{project.subtitle}</p>
            </div>

            <div className="relative z-10 flex items-center gap-4 mt-6">
              <div className="w-14 h-14 rounded-xl bg-secondary/80 border border-border flex items-center justify-center p-2">
                <img
                  src={project.icon || project.logo}
                  alt={`${project.title} icon`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <img
                  src={project.logo}
                  alt={`${project.title} logo`}
                  className="h-8 object-contain object-left"
                />
              </div>
            </div>
          </div>

          {/* Hero Screenshot — Large Cell */}
          <div className="lg:col-span-3 relative group cursor-pointer overflow-hidden" onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}>
            <img
              src={project.gallery[0]?.src}
              alt={project.gallery[0]?.label}
              className="w-full h-full object-cover min-h-[280px] lg:min-h-[320px] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-card/60" />
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-[11px] font-medium text-foreground border border-border">
              {project.gallery[0]?.label}
            </div>
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 flex items-center justify-center">
              <Eye className="w-8 h-8 text-foreground opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
            </div>
          </div>
        </div>

        {/* Bottom Bar — Color Palette Preview + Actions */}
        <div className="border-t border-border px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.colors.map((color) => (
              <div
                key={color.hex}
                className="w-6 h-6 rounded-full border border-border/50"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-2">{project.year} • {project.tools.join(" · ")}</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="group/btn"
            >
              {expanded ? "Collapse" : "Details"}
              <ChevronDown className={`ml-1 w-3.5 h-3.5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
            </Button>
            <Button
              size="sm"
              asChild
              className="gap-2"
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                View Live Site
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Expandable Brand Board */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-border">
                {/* Design Philosophy */}
                <div className="px-8 py-8">
                  <p className="text-muted-foreground leading-relaxed max-w-3xl">
                    {project.designPhilosophy}
                  </p>
                </div>

                {/* Brand Board Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-border">
                  {/* Color Palette */}
                  <div className="p-8 border-b md:border-b-0 md:border-r border-border">
                    <div className="flex items-center gap-2 mb-6">
                      <Palette className="w-4 h-4 text-primary" />
                      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        Color Palette
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-5">
                      {project.colors.map((color) => (
                        <ColorSwatch key={color.hex} color={color} />
                      ))}
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="p-8 border-b md:border-b-0 md:border-r border-border">
                    <div className="flex items-center gap-2 mb-6">
                      <Type className="w-4 h-4 text-primary" />
                      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        Typography
                      </h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Display</span>
                        <p className="text-2xl font-bold text-foreground mt-1">{project.typography.display}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Body</span>
                        <p className="text-lg text-foreground mt-1">{project.typography.body}</p>
                      </div>
                      {project.typography.mono && (
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Mono</span>
                          <p className="text-sm font-mono text-foreground mt-1">{project.typography.mono}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Eye className="w-4 h-4 text-primary" />
                      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        Overview
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Gallery Grid */}
                <div className="border-t border-border p-8">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                    Brand Assets & Mockups
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {project.gallery.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group/img cursor-pointer rounded-xl overflow-hidden bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300"
                        onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}
                      >
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img
                            src={item.src}
                            alt={item.label}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                          />
                        </div>
                        <div className="px-3 py-2">
                          <span className="text-[11px] text-muted-foreground">{item.label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </motion.div>
  );
};

const BrandShowcase = ({ projects }: BrandShowcaseProps) => {
  return (
    <div className="space-y-10">
      {projects.map((project, index) => (
        <BrandCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

export default BrandShowcase;

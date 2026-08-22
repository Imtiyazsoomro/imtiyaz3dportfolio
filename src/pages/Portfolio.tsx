import { useState } from "react";
import { motion } from "framer-motion";
import { projects, type ProjectCategory } from "@/data/projects";
import { brandProjects } from "@/data/brandProjects";
import ProjectCard from "@/components/ProjectCard";
import BrandShowcase from "@/components/BrandShowcase";
import SEOHead from "@/components/SEOHead";

const categories: (ProjectCategory | "All")[] = ["All", "Game Assets • Architecture", "Hard Surface • Concepts", "Brand Identity", "AI-Enhanced Digital Media"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : activeCategory === "Brand Identity"
    ? []
    : projects.filter(project => project.category === activeCategory);

  const showBrandSection = activeCategory === "All" || activeCategory === "Brand Identity";

  return (
    <main className="pt-24 pb-20">
      <SEOHead
        title="Portfolio — 3D, Brand Identity & AI Media Projects"
        description="Browse Imtiyaz Soomro's portfolio: game assets, architecture visualization, hard-surface vehicle concepts, brand identity systems and AI-enhanced digital media."
        path="/portfolio"
      />
      <div className="container px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            My Work
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mt-3">
            Portfolio
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Explore my creative projects spanning 3D modeling, brand identity, and AI-enhanced media.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 && (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {/* Brand Identity Section — below other items */}
        {showBrandSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-16"
          >
            {activeCategory === "All" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Brand Identity
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Full-scope brand design — from logomarks to live digital products.
                </p>
              </motion.div>
            )}
            <BrandShowcase projects={brandProjects} />
          </motion.div>
        )}

        {filteredProjects.length === 0 && !showBrandSection && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Portfolio;

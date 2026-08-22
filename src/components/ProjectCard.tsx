import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/project/${project.id}`}
        className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
        <div className="p-5">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="font-display font-semibold text-foreground text-lg mt-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            {project.tools.slice(0, 3).join(" • ")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;

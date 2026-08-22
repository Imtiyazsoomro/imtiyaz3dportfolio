import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import MasonrySidebar from "@/components/MasonrySidebar";
import MasonryGrid from "@/components/MasonryGrid";
import { masonryTiles } from "@/data/masonryTiles";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="3D Artist & Creative Designer"
        description="Portfolio of Imtiyaz Soomro — 3D Artist, Brand Identity Designer & Creative Professional. Explore vehicle designs, architecture, brand identity, and AI-enhanced media."
        path="/"
      />
      <MasonrySidebar />

      <main className="lg:pl-56 pt-20 lg:pt-0">
        <div className="px-4 md:px-8 py-8 lg:py-12">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <h1 className="font-display font-bold text-3xl md:text-5xl text-foreground tracking-tight">
                Imtiyaz Soomro
              </h1>

              <p className="text-muted-foreground mt-2 text-sm md:text-base uppercase tracking-[0.2em]">
                3D Artist &amp; Creative Designer
              </p>
            </div>

            <Button asChild variant="outline" className="group self-start md:self-auto">
              <Link to="/portfolio">
                View full portfolio
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.header>

          <MasonryGrid tiles={masonryTiles} />

          <footer className="mt-16 pb-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Imtiyaz Soomro. All rights reserved.
            </p>
            <Link
              to="/contact"
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              Let's work together
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Home;

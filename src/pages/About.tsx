import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, MapPin, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const skills = [
  "3D Asset Creation",
  "Product Visualization",
  "Isometric Illustration",
  "Hard-surface Modeling",
  "Social Media Graphics",
  "Brand Identity Design",
];

const tools = [
  { name: "Maya", category: "3D" },
  { name: "Blender", category: "3D" },
  { name: "Unity", category: "Development" },
  { name: "Photoshop", category: "Design" },
  { name: "Illustrator", category: "Design" },
  { name: "Canva", category: "Design" },
];

const About = () => {
  return (
    <main className="pt-24 pb-20">
      <SEOHead
        title="About"
        description="Learn about Imtiyaz Soomro — CS Graduate, 3D Artist & Creative Designer based in Hyderabad, Pakistan."
        path="/about"
      />
      <div className="container px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            About Me
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mt-3">
            Imtiyaz Soomro
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-display font-bold text-2xl text-foreground mb-6">
              CS Graduate with a Passion for Creative Tools
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                I blend the precision of computer science with the artistry of 3D design. 
                With a BS in Computer Science, I bring a unique analytical perspective to 
                creative challenges—combining logic and data-driven thinking with 
                aesthetic sensibility.
              </p>
              <p>
                My work spans from photorealistic product visualizations for commercial 
                brands to stylized game assets and architectural visualizations. I'm 
                particularly passionate about creating assets that other designers and 
                developers can use in their own projects.
              </p>
              <p>
                Based in Hyderabad, Pakistan, I work with clients globally to bring their 
                creative visions to life through 3D modeling, graphic design, and visual 
                content creation.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-card rounded-xl border border-border p-4">
                <GraduationCap className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground">Education</span>
                <p className="text-foreground font-medium text-sm">BS Computer Science</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <MapPin className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground">Location</span>
                <p className="text-foreground font-medium text-sm">Hyderabad, Pakistan</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <Code className="w-6 h-6 text-primary mb-2" />
                <span className="text-xs text-muted-foreground">Focus</span>
                <p className="text-foreground font-medium text-sm">3D & Design</p>
              </div>
            </div>
          </motion.div>

          {/* Skills & Tools */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Skills */}
            <div className="mb-10">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-secondary rounded-full text-sm text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                Tools & Software
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-card rounded-xl border border-border p-4 flex items-center justify-between"
                  >
                    <span className="font-medium text-foreground">{tool.name}</span>
                    <span className="text-xs text-muted-foreground">{tool.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button asChild size="lg">
            <Link to="/contact">
              Let's Work Together
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
};

export default About;

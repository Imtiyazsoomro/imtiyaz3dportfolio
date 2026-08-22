import { motion } from "framer-motion";
import { Box, Instagram, Palette, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const services = [
  {
    icon: Box,
    title: "3D Visuals",
    description: "High-quality product rendering and game assets. From realistic product visualizations to stylized game-ready models, I bring your ideas to life in three dimensions.",
    features: [
      "Product Rendering",
      "Architectural Visualization",
      "Game Assets & Props",
      "Character Modeling",
      "Animation & Motion",
    ],
  },
  {
    icon: Instagram,
    title: "Social Media Design",
    description: "Eye-catching Instagram and LinkedIn visual content that stops the scroll. Strategic designs that communicate your brand's message and drive engagement.",
    features: [
      "Instagram Feed Design",
      "Stories & Reels Graphics",
      "LinkedIn Banners",
      "Post Templates",
      "Content Calendars",
    ],
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Complete visual identity systems from logo design to brand guidelines. Create a cohesive look that makes your brand memorable and professional.",
    features: [
      "Logo Design",
      "Brand Guidelines",
      "Business Cards",
      "Letterheads",
      "Marketing Collateral",
    ],
  },
];

const Services = () => {
  return (
    <main className="pt-24 pb-20">
      <SEOHead
        title="Services"
        description="Professional creative services — 3D visuals, social media design, and brand identity by Imtiyaz Soomro."
        path="/services"
      />
      <div className="container px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            What I Offer
          </span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mt-3">
            Services
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Professional creative services tailored to bring your vision to life.
          </p>
        </motion.div>

        {/* Services Grid */}
        <h2 className="sr-only">Creative services I offer</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border p-8 hover:border-primary/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                {service.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center bg-card rounded-2xl border border-border p-12"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
            Ready to Start a Project?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Let's discuss your ideas and bring them to life together.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
};

export default Services;

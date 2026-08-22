import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Linkedin, Mail, ExternalLink } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/portfolio", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: "https://www.linkedin.com/in/imtiyazsoomro/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.artstation.com/imtiyazsoomro", label: "ArtStation", Icon: ExternalLink },
  { href: "mailto:iimtiiyazhussainsoomro11@gmail.com", label: "Email", Icon: Mail },
];

const SidebarContent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-full flex-col justify-between py-10 px-8">
      <div>
        <Link to="/" className="font-display font-bold text-2xl">
          <span className="text-foreground">IS</span>
          <span className="text-primary">.</span>
        </Link>

        <nav className="mt-16 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-6">
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

const MasonrySidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-56 border-r border-border bg-background z-40">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 h-16 bg-background/90 backdrop-blur-lg border-b border-border">
        <Link to="/" className="font-display font-bold text-xl">
          <span className="text-foreground">Imtiyaz</span>
          <span className="text-primary">.</span>
        </Link>
        <button onClick={() => setIsOpen(true)} aria-label="Open menu" className="text-foreground">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute left-0 top-0 bottom-0 w-64 bg-background border-r border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="absolute right-4 top-5 text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MasonrySidebar;

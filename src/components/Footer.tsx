import { Link } from "react-router-dom";
import { Linkedin, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-display font-bold text-xl">
              <span className="text-foreground">Imtiyaz</span>
              <span className="text-primary">.</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-3">
              3D Artist & Graphic Designer based in Hyderabad, Pakistan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Portfolio
              </Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Services
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/imtiyazsoomro/"
                aria-label="Imtiyaz Soomro on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.artstation.com/imtiyazsoomro"
                aria-label="Imtiyaz Soomro on ArtStation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="mailto:iimtiiyazhussainsoomro11@gmail.com"
                aria-label="Email Imtiyaz Soomro"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Imtiyaz Soomro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

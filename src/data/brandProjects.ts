import optimeshIcon from "@/assets/optimesh-icon.png";
import optimeshLogoDark from "@/assets/optimesh-logo-dark.png";
import optimeshLogoLight from "@/assets/optimesh-logo-light.png";
import optimeshPatternOrange from "@/assets/optimesh-pattern-orange.png";
import optimeshPatternLight from "@/assets/optimesh-pattern-light.png";
import optimeshArrowsOrange from "@/assets/optimesh-arrows-orange.png";
import optimeshArrowsLight from "@/assets/optimesh-arrows-light.png";
import optimeshHero from "@/assets/optimesh-hero.png";
import optimeshLinkedin from "@/assets/optimesh-linkedin.png";

import optisyncLogo from "@/assets/optisync-logo.png";
import optisyncDashboard from "@/assets/optisync-dashboard.png";
import optisyncLogin from "@/assets/optisync-login.png";

export interface BrandColor {
  name: string;
  hex: string;
  hsl: string;
}

export interface BrandProject {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  liveUrl: string;
  description: string;
  designPhilosophy: string;
  logo: string;
  logoAlt?: string;
  icon?: string;
  colors: BrandColor[];
  typography: {
    display: string;
    body: string;
    mono?: string;
  };
  gallery: { src: string; label: string }[];
  tools: string[];
}

export const brandProjects: BrandProject[] = [
  {
    id: "optimesh-solutions",
    title: "OptiMesh Solutions",
    subtitle: "Automated 3D Pipelines for AI & XR",
    role: "Lead Brand Designer",
    year: "2025",
    liveUrl: "https://optimeshsolution.lovable.app",
    description:
      "A bold, high-energy brand identity for a technical agency bridging creative 3D geometry and AI data logic. The visual system communicates precision, speed, and industrial strength through its vibrant orange accents against deep dark backgrounds.",
    designPhilosophy:
      "The identity is built around the concept of a 'Transform Node'—the icon represents vertices, edges, and control points from 3D software. This metaphor extends into every brand element: dot-matrix patterns symbolize data grids, arrow motifs suggest optimized flow, and the stencil typography reinforces an engineering-first ethos.",
    logo: optimeshLogoDark,
    logoAlt: optimeshLogoLight,
    icon: optimeshIcon,
    colors: [
      { name: "Signal Orange", hex: "#F26522", hsl: "19 89% 54%" },
      { name: "Carbon Black", hex: "#1A1A2E", hsl: "240 28% 14%" },
      { name: "Steel Gray", hex: "#2D2D44", hsl: "240 21% 22%" },
      { name: "Cloud White", hex: "#F5F5F5", hsl: "0 0% 96%" },
    ],
    typography: {
      display: "Space Grotesk",
      body: "Inter",
      mono: "JetBrains Mono",
    },
    gallery: [
      { src: optimeshHero, label: "Hero Landing Page" },
      { src: optimeshLinkedin, label: "LinkedIn Brand Presence" },
      { src: optimeshIcon, label: "Brand Icon — Transform Node" },
      { src: optimeshPatternOrange, label: "Dot Matrix Pattern" },
      { src: optimeshArrowsOrange, label: "Arrow Motif System" },
      { src: optimeshPatternLight, label: "Pattern — Light Variant" },
      { src: optimeshArrowsLight, label: "Arrows — Light Variant" },
    ],
    tools: ["Figma", "Illustrator", "Lovable", "Photoshop"],
  },
  {
    id: "optisync-vision",
    title: "OptiSync Vision",
    subtitle: "Unified Digital Ecosystem for Medical & Tech Data",
    role: "Identity & UI Designer",
    year: "2025",
    liveUrl: "https://opti-sync-vision.lovable.app",
    description:
      "A clean, action-oriented brand identity and full UI design system for an ophthalmic inventory management platform. The design balances clinical trust with modern SaaS aesthetics, creating an interface that medical professionals can rely on.",
    designPhilosophy:
      "The 'sync' lettermark features a dynamic circular arrow integrated into the 'S', symbolizing real-time data synchronization. The warm orange dot accent adds a human touch to the otherwise technical blue palette. Every UI element follows an action-oriented visual language — bold status indicators, clear data hierarchy, and purposeful whitespace.",
    logo: optisyncLogo,
    icon: optisyncLogo,
    colors: [
      { name: "Sync Blue", hex: "#2563EB", hsl: "217 91% 53%" },
      { name: "Deep Navy", hex: "#0F172A", hsl: "222 47% 11%" },
      { name: "Slate Dark", hex: "#1E293B", hsl: "217 33% 17%" },
      { name: "Accent Gold", hex: "#F59E0B", hsl: "38 92% 50%" },
    ],
    typography: {
      display: "Inter",
      body: "Inter",
    },
    gallery: [
      { src: optisyncLogin, label: "Auth Screen — Dark Mode" },
      { src: optisyncDashboard, label: "Dashboard — Inventory Overview" },
      { src: optisyncLogo, label: "OptiSync Wordmark" },
    ],
    tools: ["Figma", "Lovable", "Supabase", "Tailwind CSS"],
  },
];

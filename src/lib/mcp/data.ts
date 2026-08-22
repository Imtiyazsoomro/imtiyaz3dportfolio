// Plain, image-free mirrors of the public portfolio content so the MCP server
// bundle stays free of asset imports. Keep in sync with src/data/* and pages.

export const SITE_URL = "https://imtiyaz.lovable.app";

export interface McpProject {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  tools: string[];
  description: string;
  imageCount: number;
  videoCaptions: string[];
  url: string;
}

export const projects: McpProject[] = [
  {
    id: "automotive-vehicle-design",
    title: "Automotive & Vehicle Design",
    category: "Hard Surface • Concepts",
    client: "Personal Project",
    year: "2023 - 2025",
    tools: ["Blender", "Autodesk Maya", "Substance Painter", "After Effects"],
    description:
      "A versatile collection of high-fidelity vehicle assets ranging from vintage classics to futuristic sci-fi concepts. Demonstrates expertise in complex hard-surface topology, PBR texturing, and vehicle rigging for game engines.",
    imageCount: 20,
    videoCaptions: [
      "AI Generated from 3D Model",
      "Blending 3D physics with 2D post-processing using After Effects film grain and lighting effects.",
    ],
    url: `${SITE_URL}/portfolio/automotive-vehicle-design`,
  },
  {
    id: "3d-props-environment",
    title: "3D Props & Environment",
    category: "Game Assets • Architecture",
    client: "Asset Library",
    year: "2024",
    tools: ["Blender", "Maya", "Substance Painter"],
    description:
      "A diverse collection of game-ready 3D assets ranging from historical architecture to stylized props. Includes modular environment pieces, interactive objects, and hand-painted weapons—demonstrating expertise in both modeling and texturing for game engines.",
    imageCount: 10,
    videoCaptions: [],
    url: `${SITE_URL}/portfolio/3d-props-environment`,
  },
  {
    id: "ar-architecture",
    title: "AR Architecture Visualization",
    category: "Game Assets • Architecture",
    client: "University FYP",
    year: "2023",
    tools: ["Maya", "Unity", "AR Foundation"],
    description:
      "Final Year Project developing augmented reality visualizations of university buildings. Created detailed 3D models of campus architecture that can be viewed through AR, helping prospective students and visitors explore the campus virtually.",
    imageCount: 6,
    videoCaptions: [],
    url: `${SITE_URL}/portfolio/ar-architecture`,
  },
  {
    id: "interior-visualization",
    title: "Interior & Exterior Design",
    category: "Game Assets • Architecture",
    client: "Various Clients",
    year: "2024",
    tools: ["Maya", "V-Ray", "Photoshop"],
    description:
      "Professional interior and exterior architectural visualizations for residential and commercial clients. These renders help clients visualize their spaces before construction, with attention to lighting, materials, and spatial design.",
    imageCount: 3,
    videoCaptions: [],
    url: `${SITE_URL}/portfolio/interior-visualization`,
  },
  {
    id: "ai-enhanced-digital-media",
    title: "AI-Enhanced Digital Media",
    category: "AI-Enhanced Digital Media",
    client: "Various Clients",
    year: "2025",
    tools: ["Premiere Pro", "AI Video Tools", "Canva"],
    description:
      "Stunning AI-enhanced wedding invitation videos and digital cards. These projects blend traditional wedding aesthetics with modern AI-powered motion graphics, creating memorable digital experiences for special occasions.",
    imageCount: 0,
    videoCaptions: [
      "Nikkah Invitation - Elegant digital invitation with AI-enhanced animations",
      "Wedding Card - Beautifully crafted digital wedding announcement",
      "Mayoun Night - Vibrant celebration invitation with dynamic effects",
      "Wedding Video - Complete wedding invitation package",
    ],
    url: `${SITE_URL}/portfolio/ai-enhanced-digital-media`,
  },
];

export interface McpBrandProject {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  liveUrl: string;
  description: string;
  designPhilosophy: string;
  colors: { name: string; hex: string }[];
  typography: { display: string; body: string; mono?: string };
  tools: string[];
  url: string;
}

export const brandProjects: McpBrandProject[] = [
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
      "The identity is built around the concept of a 'Transform Node'—the icon represents vertices, edges, and control points from 3D software. Dot-matrix patterns symbolize data grids, arrow motifs suggest optimized flow, and the stencil typography reinforces an engineering-first ethos.",
    colors: [
      { name: "Signal Orange", hex: "#F26522" },
      { name: "Carbon Black", hex: "#1A1A2E" },
      { name: "Steel Gray", hex: "#2D2D44" },
      { name: "Cloud White", hex: "#F5F5F5" },
    ],
    typography: { display: "Space Grotesk", body: "Inter", mono: "JetBrains Mono" },
    tools: ["Figma", "Illustrator", "Lovable", "Photoshop"],
    url: `${SITE_URL}/portfolio/optimesh-solutions`,
  },
  {
    id: "optisync-vision",
    title: "OptiSync Vision",
    subtitle: "Unified Digital Ecosystem for Medical & Tech Data",
    role: "Identity & UI Designer",
    year: "2025",
    liveUrl: "https://opti-sync-vision.lovable.app",
    description:
      "A clean, action-oriented brand identity and full UI design system for an ophthalmic inventory management platform. The design balances clinical trust with modern SaaS aesthetics.",
    designPhilosophy:
      "The 'sync' lettermark features a dynamic circular arrow integrated into the 'S', symbolizing real-time data synchronization. The warm orange dot accent adds a human touch to the otherwise technical blue palette.",
    colors: [
      { name: "Sync Blue", hex: "#2563EB" },
      { name: "Deep Navy", hex: "#0F172A" },
      { name: "Slate Dark", hex: "#1E293B" },
      { name: "Accent Gold", hex: "#F59E0B" },
    ],
    typography: { display: "Inter", body: "Inter" },
    tools: ["Figma", "Lovable", "Supabase", "Tailwind CSS"],
    url: `${SITE_URL}/portfolio/optisync-vision`,
  },
];

export const services = [
  {
    title: "3D Visuals",
    description:
      "High-quality product rendering and game assets. From realistic product visualizations to stylized game-ready models, I bring your ideas to life in three dimensions.",
  },
  {
    title: "Social Media Design",
    description:
      "Eye-catching Instagram and LinkedIn visual content that stops the scroll. Strategic designs that communicate your brand's message and drive engagement.",
  },
  {
    title: "Brand Identity",
    description:
      "Complete visual identity systems from logo design to brand guidelines. Create a cohesive look that makes your brand memorable and professional.",
  },
];

export const about = {
  name: "Imtiyaz Soomro",
  headline: "CS Graduate, 3D Artist & Creative Designer",
  location: "Hyderabad, Pakistan",
  education: "BS Computer Science",
  focus: "3D & Design",
  bio: [
    "I blend the precision of computer science with the artistry of 3D design. With a BS in Computer Science, I bring a unique analytical perspective to creative challenges—combining logic and data-driven thinking with aesthetic sensibility.",
    "My work spans from photorealistic product visualizations for commercial brands to stylized game assets and architectural visualizations. I'm particularly passionate about creating assets that other designers and developers can use in their own projects.",
    "Based in Hyderabad, Pakistan, I work with clients globally to bring their creative visions to life through 3D modeling, graphic design, and visual content creation.",
  ],
  skills: [
    "3D Asset Creation",
    "Product Visualization",
    "Isometric Illustration",
    "Hard-surface Modeling",
    "Social Media Graphics",
    "Brand Identity Design",
  ],
  tools: [
    { name: "Maya", category: "3D" },
    { name: "Blender", category: "3D" },
    { name: "Unity", category: "Development" },
    { name: "Photoshop", category: "Design" },
    { name: "Illustrator", category: "Design" },
    { name: "Canva", category: "Design" },
  ],
  contact: {
    email: "iimtiiyazhussainsoomro11@gmail.com",
    linkedin: "https://www.linkedin.com/in/imtiyazsoomro/",
    artstation: "https://www.artstation.com/imtiyazsoomro",
    website: SITE_URL,
    contactPage: `${SITE_URL}/contact`,
  },
};

// Project images imports
import mustang from "@/assets/mustang.jpg";
import classroom from "@/assets/classroom.jpg";
import bowlingArcade from "@/assets/bowling-arcade.jpg";

import architecture1 from "@/assets/architecture-1.png";
import architecture2 from "@/assets/architecture-2.png";
import architecture3 from "@/assets/architecture-3.png";
import architecture5 from "@/assets/architecture-5.png";
import architecture6 from "@/assets/architecture-6.png";
import architectureWireframe from "@/assets/architecture-wireframe.png";
import kitchenInterior from "@/assets/kitchen-interior.png";
import buildingNight from "@/assets/building-night.png";
import bedroomInterior from "@/assets/bedroom-interior.png";
import wallOfDeath from "@/assets/wall-of-death.png";
import classroomInterior from "@/assets/classroom-interior.png";


// Vehicle images
import rickshaw1 from "@/assets/rickshaw-1.png";
import rickshaw2 from "@/assets/rickshaw-2.png";
import rickshaw3 from "@/assets/rickshaw-3.png";
import mustangRacing from "@/assets/mustang-racing.png";
import mustangSolo from "@/assets/mustang-solo.png";
import f1Car1 from "@/assets/f1-car-1.png";
import f1Car2 from "@/assets/f1-car-2.png";
import scifiCar1 from "@/assets/scifi-car-1.png";
import scifiCar2 from "@/assets/scifi-car-2.png";
import cybertruck from "@/assets/cybertruck.png";
import stylizedVan from "@/assets/stylized-van.jpg";
import vanWireframe from "@/assets/van-wireframe.png";
import vanSolid from "@/assets/van-solid.png";
import vanRender1 from "@/assets/van-render-1.jpg";
import vanRender2 from "@/assets/van-render-2.jpg";

// Robotic arm images
import roboticArm1 from "@/assets/robotic-arm-1.png";
import roboticArm2 from "@/assets/robotic-arm-2.png";
import roboticArm3 from "@/assets/robotic-arm-3.png";

// Props & Environment images
import clockTower1 from "@/assets/clock-tower-1.png";
import clockTower2 from "@/assets/clock-tower-2.png";
import clockTower3 from "@/assets/clock-tower-3.png";
import clockTower4 from "@/assets/clock-tower-4.png";
import woodenCart1 from "@/assets/wooden-cart-1.png";
import woodenCart2 from "@/assets/wooden-cart-2.png";
import fantasySword from "@/assets/fantasy-sword.png";

// Videos
import automotiveVideo from "@/assets/automotive-video.mp4";
import firstScene from "@/assets/first-scene.mp4";

// AI-Enhanced Digital Media videos
import tahirNikkahInvitation from "@/assets/tahir-nikkah-invitation.mp4";
import tahirWeddingCard from "@/assets/tahir-wedding-card.mp4";
import tahirMayounNight from "@/assets/tahir-mayoun-night.mp4";
import alirazaWedding from "@/assets/aliraza-wedding.mp4";
import weddingCover from "@/assets/wedding-cover.png";

export type ProjectCategory = "Game Assets • Architecture" | "Brand Identity" | "Hard Surface • Concepts" | "AI-Enhanced Digital Media";

export interface ProjectVideo {
  src: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  coverImage: string;
  client: string;
  tools: string[];
  year: string;
  description: string;
  gallery: string[];
  video?: string;
  videos?: ProjectVideo[];
}

export const projects: Project[] = [
  {
    id: "automotive-vehicle-design",
    title: "Automotive & Vehicle Design",
    category: "Hard Surface • Concepts",
    coverImage: wallOfDeath,
    client: "Personal Project",
    tools: ["Blender", "Autodesk Maya", "Substance Painter", "After Effects"],
    year: "2023 - 2025",
    description: "A versatile collection of high-fidelity vehicle assets ranging from vintage classics to futuristic sci-fi concepts. Demonstrates expertise in complex hard-surface topology, PBR texturing, and vehicle rigging for game engines.",
    gallery: [wallOfDeath, rickshaw1, rickshaw2, rickshaw3, mustang, mustangRacing, mustangSolo, f1Car1, f1Car2, scifiCar1, scifiCar2, cybertruck, roboticArm1, roboticArm2, roboticArm3, stylizedVan, vanWireframe, vanSolid, vanRender1, vanRender2],
    video: automotiveVideo,
    videos: [
      { src: automotiveVideo, caption: "AI Generated from 3D Model" },
      { src: firstScene, caption: "Blending 3D physics with 2D post-processing. I used After Effects to add film grain and lighting effects, turning a low-poly 3D render into a cohesive cinematic moment." },
    ],
  },
  {
    id: "3d-props-environment",
    title: "3D Props & Environment",
    category: "Game Assets • Architecture",
    coverImage: clockTower1,
    client: "Asset Library",
    tools: ["Blender", "Maya", "Substance Painter"],
    year: "2024",
    description: "A diverse collection of game-ready 3D assets ranging from historical architecture to stylized props. Includes modular environment pieces, interactive objects, and hand-painted weapons—demonstrating expertise in both modeling and texturing for game engines.",
    gallery: [clockTower1, clockTower2, clockTower3, clockTower4, woodenCart1, woodenCart2, fantasySword, classroom, classroomInterior, bowlingArcade],
  },
  {
    id: "ar-architecture",
    title: "AR Architecture Visualization",
    category: "Game Assets • Architecture",
    coverImage: architecture1,
    client: "University FYP",
    tools: ["Maya", "Unity", "AR Foundation"],
    year: "2023",
    description: "Final Year Project developing augmented reality visualizations of university buildings. Created detailed 3D models of campus architecture that can be viewed through AR, helping prospective students and visitors explore the campus virtually.",
    gallery: [architecture1, architecture2, architecture3, architecture5, architecture6, architectureWireframe],
  },
  {
    id: "interior-visualization",
    title: "Interior & Exterior Design",
    category: "Game Assets • Architecture",
    coverImage: kitchenInterior,
    client: "Various Clients",
    tools: ["Maya", "V-Ray", "Photoshop"],
    year: "2024",
    description: "Professional interior and exterior architectural visualizations for residential and commercial clients. These renders help clients visualize their spaces before construction, with attention to lighting, materials, and spatial design.",
    gallery: [kitchenInterior, buildingNight, bedroomInterior],
  },
  // Brand Identity projects are now in brandProjects.ts
  {
    id: "ai-enhanced-digital-media",
    title: "AI-Enhanced Digital Media",
    category: "AI-Enhanced Digital Media",
    coverImage: weddingCover,
    client: "Various Clients",
    tools: ["Premiere Pro", "AI Video Tools", "Canva"],
    year: "2025",
    description: "Stunning AI-enhanced wedding invitation videos and digital cards. These projects blend traditional wedding aesthetics with modern AI-powered motion graphics, creating memorable digital experiences for special occasions.",
    gallery: [],
    videos: [
      { src: tahirNikkahInvitation, caption: "Nikkah Invitation - Elegant digital invitation with AI-enhanced animations" },
      { src: tahirWeddingCard, caption: "Wedding Card - Beautifully crafted digital wedding announcement" },
      { src: tahirMayounNight, caption: "Mayoun Night - Vibrant celebration invitation with dynamic effects" },
      { src: alirazaWedding, caption: "Wedding Video - Complete wedding invitation package" },
    ],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: ProjectCategory | "All"): Project[] => {
  if (category === "All") return projects;
  return projects.filter(project => project.category === category);
};

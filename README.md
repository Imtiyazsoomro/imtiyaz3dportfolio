# Imtiyaz Soomro | 3D Artist & Graphic Designer Portfolio

Live Application: https://imtiyaz3d.netlify.app/portfolio

## Overview
A high-performance, dark-mode portfolio showcasing a multidisciplinary blend of spatial 3D design, interactive systems, and technical execution. As a Computer Science graduate, I bridge the gap between creative 3D modeling (Maya, Blender) and logical, data-driven architecture. 

This repository houses the frontend source code for the portfolio, featuring interactive case studies, responsive image galleries, and a functional backend integration for client inquiries.

## Featured Projects
* **Commercial Product Visualization:** Modeled and rendered a wax perfume container and animation for the VOID Essence perfume company, focusing on professional lighting and brand accuracy.
* **Stylized 3D Environments:** 'Isometric Classroom' and 'Bowling Alley Arcade' showcasing usable, low-poly aesthetics and spatial composition.
* **Hard Surface & Animation:** 'Wall of Death' animation featuring a Low-poly Mustang 1963, emphasizing technical rigging, motion, and automotive design.
* **Joarney (AR Navigation):** Augmented Reality based navigation system utilizing ARCore, Unity, and MapBox.

## Services & Skills
* 3D Asset Creation | Spatial Environment Design | Hard-surface Modeling | Isometric Illustration | Social Media Graphics & Branding

## Tools Used (Architecture & Stack)
* **Lovable (AI Builder):** Used for rapid frontend React component generation and UI scaffolding using natural language prompts.
* **GitHub:** Version control and repository hosting.
* **Netlify:** Continuous deployment and live hosting.

## Setup & Reproduction Steps
To clone and run this portfolio environment locally:
1. Clone the repository: `git clone https://github.com/Imtiyazsoomro/imtiyaz3dportfolio.git`
2. Navigate to the project directory: `cd imtiyaz3dportfolio`
3. Install dependencies: `npm install`
4. Run the local development server: `npm run dev`
5. To deploy your own version, connect your forked GitHub repository to Netlify for automated CI/CD builds.

## How it was built
1. **Prompt Logic & Wireframing:** Initial wireframing and copy were drafted using Claude to define the layout, identity kit, and project descriptions.
2. **AI Co-Pilot Generation:** The frontend React code was generated and iterated upon using Lovable. I treated the AI as a frontend co-pilot to bypass manual HTML/CSS styling, giving it strict negative constraints to avoid generic stock assets.
3. **Deployment Pipeline:** The repository was connected to Netlify for continuous integration. Any future updates pushed to the `main` branch automatically redeploy the live site.

## Known Limitations
* **AI Builder Edge Cases:** Highly specific custom padding or complex responsive breakpoints sometimes required manual human-in-the-loop intervention. The AI builder would occasionally break existing layouts when attempting localized mobile-view fixes.
* **3D Asset Rendering Performance:** Because the site hosts actual high-resolution spatial renders instead of AI-generated stand-ins, browsers on low-power mobile devices may experience slight performance drops. Desktop viewing is prioritized for maximum fidelity.

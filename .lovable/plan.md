# Masonry Gallery Homepage

Rebuild the homepage as an image-first masonry gallery with a fixed left sidebar, inspired by the reference template — while keeping the rest of the site (Portfolio, Services, About, Contact, project detail pages) exactly as it is today.

## What changes

**New homepage layout**
- Fixed left sidebar (desktop) with logo mark, vertical uppercase nav (Work, Services, About, Contact), social icons (LinkedIn, ArtStation, Email) and the light/dark toggle.
- Main area: a staggered masonry grid of your work — mixed tile sizes (one tall feature tile, wide tiles, square tiles) built from the gallery images already in `src/data/projects.ts`.
- Tiles are full color by default; on hover they desaturate slightly, scale in a touch, and reveal the project title + category. Clicking a tile opens that project's detail page.
- Your name and role appear as an overlay/intro block rather than a full-screen hero, so images are visible immediately.
- Mobile: sidebar collapses into a slide-in drawer (reusing the existing mobile menu pattern); grid becomes 2 columns, then 1 on very small screens.
- The global top navbar is hidden on the homepage only; every other page keeps it unchanged.

**Likes (no login)**
- A small heart button with a count on each tile (and on project detail pages).
- Counts are stored in the backend and shared across all visitors, updating live.
- One like per visitor per project, remembered in the browser so the button shows as already-liked on return; clicking again removes the like.
- No accounts, no comments.

## Technical notes

- New components: `src/components/MasonrySidebar.tsx`, `src/components/MasonryGrid.tsx`, `src/components/MasonryTile.tsx`, `src/components/LikeButton.tsx`; `src/pages/Home.tsx` rewritten to compose them.
- Tile source: a curated list derived from existing `projects[]` gallery arrays, with an explicit `span` per tile (`tall`, `wide`, `square`) so the layout matches the reference rhythm. Implemented with CSS grid + `grid-row/column-span`, no extra dependency.
- `App.tsx` gets a small check to skip `<Navbar />` and `<Footer />` on `/`.
- Hover treatment via `filter: grayscale(...)` transitions using existing motion/transition tokens — no hardcoded color classes; all styling through existing semantic tokens in `index.css`.
- Likes backend: a `project_likes` table (project_id, visitor_id, created_at) plus a `project_like_counts` view or aggregate query. RLS enabled with anon insert/delete restricted to the visitor's own row and public read; explicit GRANTs for `anon` and `authenticated`. Visitor id is a random UUID stored in `localStorage`.
- SEO on the homepage is preserved: single H1 with your name, alt text on every tile image, existing `SEOHead` retained.

## Out of scope

Portfolio, Services, About, Contact and project detail pages keep their current design and the current teal-accent dark theme. No comments, no auth.

// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from "fs"
import { readFileSync } from "fs"
import { resolve } from "path"

// Project ids are read from the data file as text: importing the module would
// pull in image assets that Node cannot resolve outside Vite.
const projectIds = Array.from(
  readFileSync(resolve("src/data/projects.ts"), "utf8").matchAll(/^\s{4}id: "([^"]+)",/gm),
).map((m) => m[1])

const BASE_URL = "https://imtiyaz3dportfolio.lovable.app"

interface SitemapEntry {
  path: string
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: string
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/portfolio", changefreq: "weekly", priority: "0.9" },
  { path: "/services", changefreq: "monthly", priority: "0.7" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "yearly", priority: "0.6" },
  ...projectIds.map((id) => ({
    path: `/project/${id}`,
    changefreq: "monthly" as const,
    priority: "0.8",
  })),
]

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  )

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n")
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries))
console.log(`sitemap.xml written (${entries.length} entries)`)

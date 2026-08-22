import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "../data";

export default defineTool({
  name: "list_projects",
  title: "List portfolio projects",
  description:
    "List Imtiyaz Soomro's 3D and digital media portfolio projects, optionally filtered by category.",
  inputSchema: {
    category: z
      .string()
      .optional()
      .describe(
        'Optional category filter, e.g. "Game Assets • Architecture", "Hard Surface • Concepts", or "AI-Enhanced Digital Media".',
      ),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const items = category
      ? projects.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()))
      : projects;
    const summary = items.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      client: p.client,
      year: p.year,
      tools: p.tools,
      url: p.url,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      structuredContent: { projects: summary },
    };
  },
});

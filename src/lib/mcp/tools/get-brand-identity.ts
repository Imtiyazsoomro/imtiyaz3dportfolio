import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { brandProjects } from "../data";

export default defineTool({
  name: "get_brand_identity",
  title: "Get brand identity case studies",
  description:
    "Get Imtiyaz Soomro's brand identity case studies with color palettes, typography, design philosophy and live links. Omit the id to list them all.",
  inputSchema: {
    id: z
      .string()
      .optional()
      .describe('Optional brand project id, e.g. "optimesh-solutions" or "optisync-vision".'),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    if (!id) {
      return {
        content: [{ type: "text", text: JSON.stringify(brandProjects, null, 2) }],
        structuredContent: { brandProjects },
      };
    }
    const project = brandProjects.find((p) => p.id === id);
    if (!project) {
      return {
        content: [
          {
            type: "text" as const,
            text: `No brand project with id "${id}". Known ids: ${brandProjects.map((p) => p.id).join(", ")}`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(project, null, 2) }],
      structuredContent: { brandProject: project },
    };
  },
});

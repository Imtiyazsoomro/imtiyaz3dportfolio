import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "../data";

export default defineTool({
  name: "get_project",
  title: "Get project details",
  description:
    "Get the full details of one portfolio project by its id, including description, tools, client and media counts.",
  inputSchema: {
    id: z.string().min(1).describe('Project id, e.g. "ar-architecture".'),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const project = projects.find((p) => p.id === id);
    if (!project) {
      return {
        content: [
          {
            type: "text" as const,
            text: `No project with id "${id}". Known ids: ${projects.map((p) => p.id).join(", ")}`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(project, null, 2) }],
      structuredContent: { project },
    };
  },
});

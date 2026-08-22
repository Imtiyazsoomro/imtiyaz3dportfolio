import { defineTool } from "@lovable.dev/mcp-js";
import { services } from "../data";

export default defineTool({
  name: "list_services",
  title: "List services offered",
  description:
    "List the design services Imtiyaz Soomro offers to clients (3D visuals, social media design, brand identity).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
    structuredContent: { services },
  }),
});

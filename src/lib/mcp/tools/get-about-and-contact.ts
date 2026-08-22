import { defineTool } from "@lovable.dev/mcp-js";
import { about } from "../data";

export default defineTool({
  name: "get_about_and_contact",
  title: "Get about and contact info",
  description:
    "Get Imtiyaz Soomro's public bio, location, skills, tool stack and public contact links (email, LinkedIn, ArtStation).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(about, null, 2) }],
    structuredContent: { about },
  }),
});

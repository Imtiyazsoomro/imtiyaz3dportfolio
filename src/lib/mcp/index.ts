import { defineMcp } from "@lovable.dev/mcp-js";
import listProjects from "./tools/list-projects";
import getProject from "./tools/get-project";
import getBrandIdentity from "./tools/get-brand-identity";
import listServices from "./tools/list-services";
import getAboutAndContact from "./tools/get-about-and-contact";

export default defineMcp({
  name: "imtiyaz-portfolio-mcp",
  title: "Imtiyaz Soomro Portfolio",
  version: "0.1.0",
  instructions:
    "Public, read-only tools for the portfolio of Imtiyaz Soomro — 3D artist, brand and visual designer. Use `list_projects` and `get_project` for 3D and digital media work, `get_brand_identity` for brand case studies with palettes and typography, `list_services` for the services offered, and `get_about_and_contact` for bio, skills and contact links. All data is already published on the public website.",
  tools: [listProjects, getProject, getBrandIdentity, listServices, getAboutAndContact],
});

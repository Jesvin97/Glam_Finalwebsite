import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "oewfkbvj";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "glammore-studio",
  title: "Glammore Premium Salon CMS",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});

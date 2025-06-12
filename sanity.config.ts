import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./sanity/schemas"

export default defineConfig({
  name: "ra9ia-collection",
  title: "Ra9ia Collection",
  projectId: "o3e5wr0n",
  dataset: "production",
  basePath: "/studio",
  plugins: [
    deskTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      logo: () => null,
    },
  },
}) 
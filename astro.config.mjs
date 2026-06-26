import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gigio-code.github.io",
  base: "/dio-una-domanda",
  integrations: [react(), sitemap()],
});

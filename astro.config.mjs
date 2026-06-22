import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://dio-una-domanda.netlify.app",
  integrations: [react(), sitemap()],
});

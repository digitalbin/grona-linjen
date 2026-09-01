import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [tailwindcss(), solidStart(), nitro()],
  nitro: {
    prerender: {
      routes: ["/"],
    },
  },
});

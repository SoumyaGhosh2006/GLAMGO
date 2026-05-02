import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from "vite-plugin-compression";
// https://vite.dev/config/
export default defineConfig({
  envPrefix: ["VITE_", "SUPABASE_"],
  plugins: [react(),
    compression({
      algorithm: "gzip",        // widely supported
      ext: ".gz",
      threshold: 10240,         // only compress files >10KB
      deleteOriginFile: false,  // keep original files
    }),
  ],
  
})

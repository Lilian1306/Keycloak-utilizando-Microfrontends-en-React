import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'shell_host',
      remotes: {
        mfeUserList: 'http://localhost:5174/assets/remoteEntry.js',
        mfeUserForm: 'http://localhost:5175/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 5173,
  },
   build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
});
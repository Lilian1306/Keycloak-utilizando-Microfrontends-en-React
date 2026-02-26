import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'mfeUserForm',
      filename: 'remoteEntry.js',
      exposes: {
        './UserForm': './src/App.jsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 5175,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  },
  preview: {
    port: 5175,
    cors: true, 
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000, // Cambia el puerto a 3000
    strictPort: true,
    cors: true,
  }
  
});


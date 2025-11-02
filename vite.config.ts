import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Game-Piedra-Papel-Tijera/',
  build: {
    outDir: 'dist', // carpeta de salida
    rollupOptions: {
      input: 'src/main.ts', // archivo principal de tu proyecto, ajustalo si usás otro
    },
  },
})

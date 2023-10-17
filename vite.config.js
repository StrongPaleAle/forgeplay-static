// vite.config.js
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default {
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'partials'),
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        "privacy-policy": resolve(__dirname, 'privacy-policy/index.html'),
        "termini-e-condizioni": resolve(__dirname, 'termini-e-condizioni/index.html'),
        "join-us": resolve(__dirname, 'join-us/index.html'),
        "404": resolve(__dirname, '404.html'),
      }
    }
  }
};
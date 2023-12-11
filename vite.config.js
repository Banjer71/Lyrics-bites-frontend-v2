import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


const cherryPickedKeys = [
  "VITE_API_KEY_MUSICMATCH",
  "VITE_API_KEY_LASTFM",
  "VITE_API_URL"
];


export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach(key => processEnv[key] = env[key]);
  return {
    // vite config
    define: {
      'process.env': processEnv
    },
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup",
      css: true,
      coverage: {
        reporter: ['text', 'json', 'html'],
      },
    },
    css: {
      localsConvention: 'camelCase'
    },
    server: {
      proxy: {
        '/v.1/api': 'http://localhost:4000/',
      }
    },
  }
})

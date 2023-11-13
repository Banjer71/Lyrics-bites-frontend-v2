import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   css: {
//     localsConvention: 'camelCase'
//   },
//   build: {
//     // generate manifest.json in outDir
//     manifest: true,
//     rollupOptions: {
//       // overwrite default .html entry
//       input: '/path/to/main.js',
//     },
//   },
//   server: {
//     proxy: {
//       '/v.1': 'http://localhost:5000',
//       '/ws': {
//         target: "https://api.musixmatch.com",
//         changeOrigin: true,
//         secure: false,
//         rewrite: path => path.replace('/api', ''),
//       },
//       '/cover': {
//         target: ' http://ws.audioscrobbler.com',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace('/cover', ''),
//       },
//     }
//   },
// })

const cherryPickedKeys = [
  "VITE_API_KEY_MUSICMATCH",
  "VITE_API_KEY_LASTFM",
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
  css: {
    localsConvention: 'camelCase'
  },
  server: {
    proxy: {
      '/v.1': 'http://localhost:5000',
      '/ws': {
        target: "https://api.musixmatch.com",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace('/api', ''),
      },
      '/cover': {
        target: ' http://ws.audioscrobbler.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/cover', ''),
      },
    }
  },
  }
})

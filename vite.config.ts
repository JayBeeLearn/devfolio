import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Custom plugin to write env file
const envPlugin = () => ({
  name: 'env-writer',
  configureServer(server) {
    server.middlewares.use('/__set-env', (req, res, next) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          try {
            fs.writeFileSync(path.resolve(__dirname, '.env'), body);
            res.statusCode = 200;
            res.end('OK');
          } catch (e) {
            console.error('Failed to write .env', e);
            res.statusCode = 500;
            res.end('Error writing file');
          }
        });
      } else {
        next();
      }
    });
  }
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), envPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

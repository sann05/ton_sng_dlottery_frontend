import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';


// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), nodePolyfills()],
    base: env.VITE_ENVIRONMENT === 'production' ? '/ton_sng_dlottery_frontend/' : '/',  
  }
})

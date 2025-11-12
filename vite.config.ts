import netlify from '@netlify/vite-plugin-tanstack-start';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		netlify(),
		tsConfigPaths({
			projects: ['./tsconfig.json'],
		}),
		tailwindcss(),
		tanstackStart({
			srcDirectory: 'src',
		}),
		viteReact(),
	],
});

// app.config.ts

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from '@tanstack/react-start/config';

export default defineConfig({
	tsr: {
		appDirectory: 'src',
	},
	vite: {
		plugins: [tailwindcss()],
	},
	server: {
		preset: 'netlify',
	},
});

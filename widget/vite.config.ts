import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'TourWidget',
			formats: ['es', 'umd'],
			fileName: (format) => `tour-widget.${format}.js`,
		},
		rollupOptions: {
			external: [],
			output: {
				globals: {},
			},
		},
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
			},
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
});

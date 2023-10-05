import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		imagetools({
			defaultDirectives: () => {
				return new URLSearchParams({
					format: 'webp',
					w: '608'
				});
			}
		})
	],
	ssr: {
		noExternal: ['three']
	}
});

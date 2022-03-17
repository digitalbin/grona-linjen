import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import { imagetools } from 'vite-imagetools';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	kit: {
		prerender: {
			default: true,
		},
		// paths: {
		// 	base: process.env.NODE_ENV === 'production' ? '/grona-linjen' : ''
		// },
		adapter: adapter(),
		// Override http methods in the Todo forms
		// methodOverride: {
		// 	allowed: ['PATCH', 'DELETE']
		// }
		vite: {
			plugins: [
				imagetools()
			]
		}
	},
};

export default config;

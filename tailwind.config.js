import plugin from 'tailwindcss/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';

const colors = {
	green: '#00F249',
	black: '#05050F',
	white: '#FFFFFF',
	gray: {
		light: '#F0F0F0',
		dark: '#BCBCBC'
	}
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors,
		opacity: {
			100: '1',
			65: '.65',
			40: '.40',
			20: '.20'
		},
		extend: {
			fontFamily: {
				sans: ['GT Walsheim Pro', ...defaultTheme.fontFamily.sans]
			},
			boxShadow: {
				sm: `6px 6px 0 ${colors.black}`,
				DEFAULT: `8px 8px 0 ${colors.black}`,
				lg: `10px 10px 0 ${colors.black}`
			}
		}
	},
	plugins: [
		plugin(function ({ addUtilities, theme }) {
			addUtilities({
				'.gutter': {
					'max-width': '1280px',
					'margin-left': 'auto',
					'margin-right': 'auto',
					'padding-left': theme('spacing.4'),
					'padding-right': theme('spacing.4')
				}
			});
		})
	]
};

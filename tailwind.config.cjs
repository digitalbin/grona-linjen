const defaultTheme = require('tailwindcss/defaultTheme');

const colors = {
	green: '#00F249',
	black: '#05050F',
	white: '#FFFFFF',
	gray: {
		light: '#F0F0F0',
		dark: '#BCBCBC'
	}
};

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors,
		opacity: {
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
				lg: `10px 10px 0 ${colors.black}`,
			}
		}
	},
	plugins: []
};

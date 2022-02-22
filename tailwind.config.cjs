const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			green: '#00F249',
			black: '#05050F',
			white: '#FFFFFF',
			gray: {
				light: '#F0F0F0',
				dark: '#BCBCBC'
			}
		},
		opacity: {
			65: '.65',
			40: '.40',
			20: '.20'
		},
		extend: {
      fontFamily: {
        sans: ['GT Walsheim Pro', ...defaultTheme.fontFamily.sans]
      }
    }
	},
	plugins: []
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundColor: {
				"cta-button": "#4A82EF",
				nav: "#3D3F49",
			},
			borderColor: {
				"nav-button": "#454545;",
			},
			colors: {
				"custom-gray": "#454545",
			},
			borderColor: (theme) => ({
				custom: theme("colors.custom-gray"),
			}),
		},
	},
	plugins: [],
};

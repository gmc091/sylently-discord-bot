module.exports = {
	description: "Adds two numbers together.",

	minArgs: 2,
	maxArgs: 2,
	correctSyntax: "Correct syntax: {PREFIX}add {ARGS}",
	expectedArgs: "<num 1> <num 2>",

	type: "BOTH",
	testOnly: true,
	reply: false,
	guildOnly: true,

	callback: ({ args }) => {
		let sum = 0;

		for (const arg of args) {
			sum += parseInt(arg);
		}

		return {
			content: `The sum is ${sum}`,
		};
	},
};

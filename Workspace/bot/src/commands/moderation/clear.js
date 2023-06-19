module.exports = {
	description: "Deletes the specified amount of messages.",

	minArgs: 1,
	maxArgs: 1,
	correctSyntax: "Correct syntax: {PREFIX}clear {ARGS}",
	expectedArgs: "<num>",

	type: "SLASH",
	testOnly: false,
	reply: true,
	guildOnly: true,

	callback: async ({ args, interaction }) => {
		const channel = interaction.channel;

		let messageCount = parseInt(args[0]);

		if (isNaN(messageCount)) {
			return "Please enter a valid number.";
		}

		if (messageCount > 100) {
			return "Please enter a number less than 100.";
		}

		if (messageCount < 1) {
			return "Please enter a number greater than 0.";
		}

		const messages = await channel.messages
			.fetch({ limit: messageCount })
			.then((messages) => channel.bulkDelete(messages, true));

		return {
			content: `Deleted ${messages.size} messages.`,
			ephemeral: true,
		};
	},
};

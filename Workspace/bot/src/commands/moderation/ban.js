const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
	description: "Bans the specified member.",

	minArgs: 1,
	maxArgs: 2,
	correctSyntax: "Correct syntax: {PREFIX}ban {ARGS}",
	expectedArgs: "<user> <reason>",

	type: "BOTH",
	testOnly: false,
	reply: true,
	guildOnly: true,

	options: [
		{
			name: "user",
			description: "The user to ban.",
			type: ApplicationCommandOptionType.User,
			required: true,
			autocomplete: true,
		},
		{
			name: "reason",
			description: "The reason for the ban.",
			type: ApplicationCommandOptionType.String,
			required: false,
		},
	],

	callback: async ({ args, interaction }) => {
		const user = interaction.options.getUser("user");
		const reason = interaction.options.getString("reason");

		const member = interaction.guild.members.cache.get(user.id);

		if (member) {
			try {
				await member.ban({ reason: reason });
				if (reason) {
					return {
						content: `Succesfully banned <@${user.id}>. Reason: ${reason}.`,
						ephemeral: true,
					};
				} else {
					return {
						content: `Succesfully banned <@${user.id}>.`,
						ephemeral: true,
					};
				}
			} catch (error) {
				return {
					content: `I couldn't ban <@${user.id}>.`,
					ephemeral: true,
				};
			}
		} else {
			return {
				content: `<@${user.id}> is not in this server.`,
				ephemeral: true,
			};
		}
	},
};

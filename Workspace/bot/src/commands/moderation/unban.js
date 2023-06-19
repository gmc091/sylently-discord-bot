const {
	ApplicationCommandOptionType,
	ActionRowBuilder,
	StringSelectMenuBuilder,
	ComponentType,
} = require("discord.js");

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
			name: "username",
			description: "The exact name of the user you want to unban.",
			type: ApplicationCommandOptionType.String,
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

	callback: async ({ args, guild }) => {
		const bans = await guild.bans.fetch({ cache: false });

		const matched = [];

		for (const [, ban] of bans) {
			if (ban.user.partial) {
				await ban.user.fetch();
			}

			if (ban.user.username === args[0]) {
				matched.push(ban.user);
				break;
			}

			// partial match
			if (ban.user.username.toLowerCase().includes(args[0].toLowerCase())) {
				matched.push(ban.user);
			}
		}

		if (matched.lenght === 0) {
			return {
				content: `No user found with the name ${args[0]}.`,
				ephemeral: true,
			};
		}

		const options = [];

		for (const user of matched) {
			options.push({ label: user.username, value: user.id });
		}

		const menuRow = new ActionRowBuilder().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId("unban-menu")
				.setPlaceholder("Select a user to unban")
				.addOptions(options)
		);

		return {
			content: "Select a user to unban.",
			components: [menuRow],
			ephemeral: true,
		};

		const collector = interaction.channel.createMessageComponentCollector({
			filter: (i) => i.customId === "unban-menu",
			time: 20000,
			max: 1,
			componentType: ComponentType.StringSelect,
		});

		collector.on("collect", async (i) => {
			// unban the user
			const user = i.values[0];
			const reason = interaction.options.getString("reason");

			try {
				interaction.guild.bans.remove(user, reason);
				if (reason) {
					return {
						content: `Succesfully unbanned <@${user.id}>. Reason: ${reason}.`,
						ephemeral: true,
					};
				} else {
					return {
						content: `Succesfully unbanned <@${user.id}>.`,
						ephemeral: true,
					};
				}
			} catch (error) {
				console.log(error);
			}
		});

		collector.on("end", async (collected) => {
			if (collected.size === 0)
				return sent.edit("Oops! Timed out. Try again later.");
		});
	},
};

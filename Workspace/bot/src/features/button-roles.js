const axios = require("axios");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const api = require("../util/api");
const buttonRoleSchema = require("../schemas/button-role.schema");

const prefix = "button-roles-";

module.exports = async (_, client) => {
	buttonRoleSchema.watch().on("change", async (data) => {
		const { _id } = data.documentKey;
		const document = await buttonRoleSchema.findById(_id);

		const { channelId, text, hexColor, buttons, messageId } = document;
		const channel = await client.channels.fetch(channelId);

		const embed = new EmbedBuilder().setColor(hexColor).setDescription(text);

		const row = new ActionRowBuilder();
		for (const { roleId, buttonText, buttonStyle, buttonEmoji } of buttons) {
			row.addComponents(
				new ButtonBuilder()
					.setCustomId(`${prefix}${roleId}`)
					.setLabel(buttonText)
					.setStyle(buttonStyle)
					.setEmoji(buttonEmoji)
			);
		}

		if (messageId) {
			try {
				const message = await channel.messages.fetch(messageId);

				message.edit({
					embeds: [embed],
					components: [row],
				});

				return;
			} catch (ignored) {}
		}

		const message = await channel.send({
			embeds: [embed],
			components: [row],
		});

		await buttonRoleSchema.updateOne({ _id }, { messageId: message.id });
	});
};

module.exports.prefix = prefix;

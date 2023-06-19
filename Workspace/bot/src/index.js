const { Client, IntentsBitField } = require("discord.js");
const CH = require("sylently-handler-test");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv/config");

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

client.on("ready", async () => {
	console.log("The bot is ready!");

	mongoose.set("strictQuery", false);
	mongoose.connect(process.env.MONGO_URI, {
		keepAlive: true,
	});

	new CH({
		client,
		mongoUri: process.env.MONGO_URI,
		commandsDir: path.join(__dirname, "commands"),
		featuresDir: path.join(__dirname, "features"),
		events: {
			dir: path.join(__dirname, "events"),
		},
		testServers: ["1076425557765525565"],
	});
});

client.login(process.env.TOKEN);

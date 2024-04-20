const { Client, IntentsBitField } = require("discord.js");
const fs = require("fs");
const path = require("path");

// getting token from json file
const token = getToken();

// creating server instance
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// checking when the bot is ready
client.on("ready", (c) => {
  console.log(`log: ${c.user.tag} is online ✅`);
});

client.on("messageCreate", (message) => {
  console.log(message.content.toUpperCase.toString);
  let uppercase_message = message.content.toUpperCase();

  // checking if user said hi
  if (
    uppercase_message === "HELLO" ||
    uppercase_message === "HI" ||
    uppercase_message === "HEY" ||
    uppercase_message === "SUP"
  ) {
    message.reply("Hello! 😁");
  }
});

// Event listener for when the client is ready
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Register slash commands
  client.guilds.cache.forEach((guild) => {
    guild.commands
      .create({
        name: "hello",
        description: "Say hello to the bot!",
      })
      .then(console.log)
      .catch(console.error);

    guild.commands
      .create({
        name: "goodbye",
        description: "Say goodbye to the bot!",
      })
      .then(console.log)
      .catch(console.error);
  });
});

// Event listener for interactionCreate event
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  // Handle different commands
  if (commandName === "hello") {
    await interaction.reply("Hello! 😁");
  } else if (commandName === "goodbye") {
    await interaction.reply("Goodbye! 👋");
  }
});

// starting client
client.login(token);

// ----------------------------------------------------------------------
// functions
// ----------------------------------------------------------------------
function getToken() {
  const filePath = path.join(__dirname, "..", "bot-token.json");
  const rawData = fs.readFileSync(filePath);
  const config = JSON.parse(rawData);
  return config.token;
}

const discord = require("discord.js");
const path = require("path");

require("dotenv").config();

const CommandHandler = require("./handlers/commandHandler");
const httpHandler = require("./handlers/httpHandler");

const config = require("./config.json");

const client = new discord.Client(
    {
		partials: ['MESSAGE', 'CHANNEL', 'REACTION'], 
        intents: [
            discord.Intents.FLAGS.GUILDS,
            discord.Intents.FLAGS.GUILD_MESSAGES,
            discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        ]
    }
);

var commandHandler;

if(process.env.NODE_ENV)
    console.log(`NODE ENV: ${process.env.NODE_ENV}`);

client.on("ready", () => {
    console.log("Bot został załadowany UwU!")
    console.log(`A jego nick to ${client.user.tag}`);
    client.user.setActivity(config.status);

    commandHandler = new CommandHandler(client);
    httpHandler(client, process.env.PORT || 8080);
});

client.on("interactionCreate", interaction => {
    if(interaction.isCommand()) {
        commandHandler.command(interaction).catch(error => console.error(error));
    }
});
// client.on("error", error => console.error(error));
// client.on("warn", warn => console.warn(warn));
// client.on("debug", debug => {
//     if(!debug.startsWith("Provided token")) console.log(debug);
// });

client.login(process.env.TOKEN);

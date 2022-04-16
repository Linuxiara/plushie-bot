const { Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { readdirSync } = require("fs");
const wait = require("util").promisify(setTimeout);
const reportError = require("../reportError");
const config = require("../config.json");

module.exports = class {
    #client; #timeouts;

    constructor(client)  {
        this.#client = client;
        this.#client.commands = new Collection();
        this.#timeouts = [];

        const commandFiles = readdirSync(__dirname + "/../commands");
            
        for(const file of commandFiles)
        {
            if(file.startsWith("-") || !file.endsWith(".js"))
                continue;
        
            const command = require(__dirname + `/../commands/${file}`);
            if(command.name)
            {
                this.#client.commands.set(command.name, command);
                console.log(`The command ${command.name} was loaded successful`);
            } else {
                console.log("The error during the command loading - no name");
                continue;
            }

        }

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        (async() => {
            console.log("Started refreshing slash commands")

            await rest.put(
                process.env.NODE_ENV === "production" ? `/applications/${this.#client.user.id}/commands` 
                : `/applications/${this.#client.user.id}/guilds/${config.devGuild}/commands`,
                { body: this.#client.commands.map(({name, description, options }) => {
                    const cmd = { name, description };
                    if(options)
                        cmd.options = options;
                    return cmd;
                }) }
    
            ); 
            console.log("Successfuly reloaded slash commands")
        })();
    }

    async command(interaction) {
        if(!interaction.channel.permissionsFor(interaction.guild.me).has("SEND_MESSAGES"))
            return;

        interaction.author = interaction.member.user;

        //timeouts
        const timeout = this.#timeouts.find(x => x.id === `${interaction.channel.id}_${interaction.author.id}`);
        if(timeout) {
            await interaction.reply(`⏲️ Proszę poczekać ${(timeout.time - Date.now()) / 1000}s i spróbować ponownie`);
            await wait(1000);
            await interaction.deleteReply();
            return;
        }
      
        this.#timeouts.push({
            time: Date.now() + config.timeout,
            id: `${interaction.channel.id}_${interaction.author.id}`
        });
        setTimeout(() => this.#timeouts.pop(`${interaction.channel.id}_${interaction.author.id}`), config.timeout);

        const cmd = this.#client.commands.get(interaction.commandName);

        //nie ma nsfw ale dałam ewentualnie na przyszłość
        if(cmd.category === "nsfw" && !interaction.channel.nsfw) {
            interaction.reply("Nie możesz wysyłać rzeczy nsfw na kanałach do tego nieprzeznaczonych zboczuszku :flushed:")
            return;
        }

        await cmd.run(this.#client, interaction)
            .catch(async error => {
                if(error.toString() === "DiscordAPIError: Unknown interaction")
                    return;

                await reportError(this.#client, error);
                await interaction.reply(`Upsik! Błąd się zdarzył podczas wykonywania komendy **${interaction.commandName}**. Psieplasiam👉👈\nAle spokojnie. Błąd został zgłoszony i wasza kochana Linuxiarza się zajmie jego naprawą OwO`).catch(() => void 0);
            });
    }
}
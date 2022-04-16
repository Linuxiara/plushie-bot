const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch");


module.exports = {
    name: "lick",
    category: "emotions",
    description: "Lizu lizu",
    options: [
        {
            name: "user",
            description: "Użytkownik",
            required: true,
            type: 6
        }
    ],
    async run(client, interaction) {
        const member = interaction.options.getMember("user");

        var gif = await fetch("https://apideebot.herokuapp.com/lick", { method: "GET"});
        gif = await gif.json();

        await interaction.reply({ embeds: [new MessageEmbed()
            .setColor("#00b7eb")
            .setTitle(member.id === interaction.author.id ? `${interaction.author.username} liże siebie 😛` : `${interaction.author.username} liże ${member.user.username} 😛`)
            .setImage(gif.image)
            ]
        });
    }
}
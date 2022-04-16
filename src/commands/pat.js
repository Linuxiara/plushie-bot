const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch");


module.exports = {
    name: "pat",
    category: "emotions",
    description: "Głasku głasku",
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
        
        var message = "";
        if(member.id === interaction.author.id || member.id === client.user.id)
            message = "Oh widzę że jesteś samotny/a *głasku głasku* 🥰";
        else 
            message = `${interaction.author.username} głaska ${member.user.username} 🥰`;

        var gif = await fetch("https://apideebot.herokuapp.com/pat", { method: "GET"});
        gif = await gif.json();

        await interaction.reply({ embeds: [new MessageEmbed()
            .setColor("#00b7eb")
            .setTitle(message)
            .setImage(gif.image)
            ]
        });
    }
}
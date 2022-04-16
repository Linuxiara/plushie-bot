const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch");


module.exports = {
    name: "nuzzle",
    category: "emotions",
    description: "Miziu miziu",
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

        var messsage = "";
        if(member.id === interaction.author.id || member.id === client.user.id)
            messsage = "Oh widzę że jesteś samotny/a! *miziu miziu* 🥰";
        else 
            messsage = `${interaction.author.username} mizia ${member.user.username} 🥰`

        var gif = await fetch("https://apideebot.herokuapp.com/nuzzle", { method: "GET"});
        gif = await gif.json();
        
        await interaction.reply({ embeds: [new MessageEmbed()
            .setColor("#00b7eb")
            .setTitle(messsage)
            .setImage(gif.image)
            ]
        });
    }
}
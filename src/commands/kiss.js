const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch");


module.exports = {
    name: "kiss",
    category: "emotions",
    description: "Całuski OwO",
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
            messsage = "Oh, widzę że jesteś samotny/a! *cmok* 😘";
        else 
            messsage = `${interaction.author.username} całuje ${member.user.username} 😘`;
        
        var gif = await fetch("https://apideebot.herokuapp.com/kiss", { method: "GET"});
        gif = await gif.json();

        await interaction.reply({ embeds: [new MessageEmbed()
            .setColor("#00b7eb")
            .setTitle(messsage)
            .setImage(gif.image)
            ]
        });
    }
}
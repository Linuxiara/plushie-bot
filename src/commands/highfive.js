const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch");


module.exports = {
    name: "highfive",
    category: "emotions",
    description: "Piona!",
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
        if(member.id === interaction.author.id)
            messsage = "Um, to ja Ci przybije piątke *przybija piątke* ✋";
        else if(member.id === client.user.id)
            messsage = "Piona! ✋"
        else 
            messsage = `${interaction.author.username} przybija piątke ${member.user.username} ✋`;

        var gif = await fetch("https://apideebot.herokuapp.com/highfive", { method: "GET"});
        gif = await gif.json();

        await interaction.reply({ embeds: [new MessageEmbed()
            .setColor("#00b7eb")
            .setTitle(messsage)
            .setImage(gif.image)
            ]
        });
    }
}
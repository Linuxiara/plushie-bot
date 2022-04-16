const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch");


module.exports = {
    name: "bite",
    category: "emotions",
    description: "Gryzu gryzu",
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

        if(member.id === interaction.author.id) {
            await interaction.reply("Czemu chcesz gryźć siebie? :flushed:");
            return;
        }

        var messsage = "";
        if(member.id === client.user.id) 
            messsage = "Auć! To boli! 😠"
        else 
            messsage = `${interaction.author.username} gryzie ${member.user.username} 😠`;

        var gif = await fetch("https://apideebot.herokuapp.com/bite", { method: "GET"});
        gif = await gif.json();

        await interaction.reply({ embeds: [new MessageEmbed()
            .setColor("#00b7eb")
            .setTitle(messsage)
            .setImage(gif.image)
            ]
        });
    }
}
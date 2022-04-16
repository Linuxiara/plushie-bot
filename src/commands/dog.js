const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "dog",
    category: "getImg",
    description: "Piesiek!",
    async run(client, interaction) {
        var picture = await fetch("https://dog.ceo/api/breeds/image/random");

        if(!picture.ok) {
                await interaction.reply("Wystąpił błąd API");
                return;
        }

        picture = await picture.json();

        await interaction.reply({ embeds: [new MessageEmbed()
                .setColor("#8b787a")
                .setTitle("Piesiek!")
                .setImage(picture.message)
            ]}
        );
    }
}
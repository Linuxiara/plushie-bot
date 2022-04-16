const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "astolfo",
    category: "getImg",
    description: "Wysyła losowego astolfo",
    async run(client, interaction) {
        var picture = await fetch("https://gayuwuapi.herokuapp.com/astolfo/sfw");
        picture = await picture.json();

        await interaction.reply({ embeds: [
            new MessageEmbed()
                .setColor("#fed9d1")
                .setTitle("Astolfo")
                .setImage(picture.url)
        ]}
        );
    }
}
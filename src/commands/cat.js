const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "cat",
    category: "getImg",
    description: "Kitku <3",
    requiredImgs: "cats",
    async run(client, interaction) {
        var picture = await fetch("https://api.thecatapi.com/v1/images/search",  {
            method: "get",
            headers: { "x-api-key": process.env.CAT_API }
        });

        if(!picture.ok) {
            await interaction.reply("Wystąpił błąd API");
            return;
        }

        picture = await picture.json();

        await interaction.reply({ embeds: [
                new MessageEmbed()
                    .setColor("#41403e")
                    .setTitle("Kitku <3")
                    .setImage(picture[0].url)
            ]}
        ).then(interaction.react("🐱").catch(() => void 0));
    }
}
const { MessageEmbed } = require("discord.js");
const { getRandomImg } = require("../tools.js");
const { decode } = require("html-entities")

module.exports = (subreddit, nsfw, reaction, flair) => {
    return async(client, interaction) => {
        const image = await getRandomImg(subreddit, nsfw, flair);

        await interaction.reply({ embeds: [
                new MessageEmbed()
                .setColor("#ff97e9")
                .setTitle(decode(image.title))
                .addField("Źródło", `[Kliknij tutaj]](https://reddit.com${image.permalink})`)
                .setImage(image.url)
                .setFooter(image.subreddit_name_prefixed)
            ] 
        });
    }
}
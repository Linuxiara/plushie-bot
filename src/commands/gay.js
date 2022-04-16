const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");


module.exports = {
    name: "gay",
    category: "fun",
    description: "Gejuje awatary",
    options: [
        {
            name: "user",
            description: "Użytkownik",
            type: 6
        }
    ],
    async run(client, interaction) {
        const user = interaction.options.getUser("user") || interaction.member.user;

        const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: "png", size: 4096 }));
        const gayFlag = await Canvas.loadImage("src/imgs/gay_flag.svg");

        const canvas = Canvas.createCanvas(avatar.width, avatar.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(avatar, 0, 0);
        ctx.globalAlpha = 0.5;
        ctx.drawImage(gayFlag, 0, 0, avatar.width, avatar.height);

        await interaction.reply({ files: [new MessageAttachment(canvas.toBuffer(), "gay.png")] });
    }
}
const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");


module.exports = {
    name: "trans",
    category: "fun",
    description: "Transuje awatary",
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
        const transFlag = await Canvas.loadImage("src/imgs/trans_flag.svg");

        const canvas = Canvas.createCanvas(avatar.width, avatar.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(avatar, 0, 0);
        ctx.globalAlpha = 0.5;
        ctx.drawImage(transFlag, 0, 0, avatar.width, avatar.height);

        interaction.reply({ files: [new MessageAttachment(canvas.toBuffer(), "trans.png")] });
    }
}
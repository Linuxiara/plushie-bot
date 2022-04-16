const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

Canvas.registerFont("src/fonts/Gill Sans Ultra Bold Condensed.ttf", { family: "Gill Sans Ultra Bold Condensed"});

module.exports = {
    name: "ship",
    category: "fun",
    description: "Shipuje ludzi",
    options: [
        {
            name: "user",
            description: "Użytkownik",
            required: true,
            type: 6
        },
        {
            name: "user2",
            description: "Drugi użytkownik",
            type: 6
        }
    ],
    async run(client, interaction) { 
        const user1 = interaction.options.getUser("user2") ? interaction.options.getUser("user") : interaction.member.user;
        const user2 = interaction.options.getUser("user2") || interaction.options.getUser("user");
        
        const background = await Canvas.loadImage("src/imgs/ship.png");
        const avatar1 = await Canvas.loadImage(user1.displayAvatarURL({ format: "png", size: 512 }));
        const avatar2 = await Canvas.loadImage(user2.displayAvatarURL({ format: "png", size: 512 }));

        const canvas = Canvas.createCanvas(background.width,background.height);
        const ctx = canvas.getContext("2d");

        ctx.font = '40px "Gill Sans Ultra Bold Condensed"';
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowBlur = 3;
        ctx.shadowColor = '#000000';
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = "center";

        ctx.drawImage(avatar1,100,180,312,280);
        ctx.drawImage(avatar2,550,180,300,280);

        ctx.drawImage(background, 0, 0);
        ctx.fillText(`${user1.username} X ${user2.username}`, canvas.width / 2, 60);
        ctx.font = '100px "Gill Sans Ultra Bold Condensed"';
        ctx.fillText(`${Math.round(Math.random() * 100)}%`, canvas.width / 2, 165);

        await interaction.reply({ files: [new MessageAttachment(canvas.toBuffer(), "ship.png")] });
    }
}
const { MessageEmbed } = require("discord.js")


const eatGifs = [
    "https://media1.tenor.com/images/ba3f35a89c220760facb86b35adc35b8/tenor.gif",
    "https://media1.tenor.com/images/0de27657daa673ccd7a60cf6919084d9/tenor.gif",
    "https://media1.tenor.com/images/a99ea233599aa06d97114fbaf007d0e7/tenor.gif",
    "https://media1.tenor.com/images/5aaf1a7f1b7fc56c5f8ee50425efeefd/tenor.gif",
    "https://media1.tenor.com/images/33ef91f2c437c492632c57f08efad25e/tenor.gif",
    "https://media1.tenor.com/images/960151a0c15fefd51e008e45e59486f9/tenor.gif"
];

module.exports = {
    name: "eat",
    category: "emotions",
    description: "Komenda służąca do jedzenia ludzi",
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
            await interaction.reply("Nie możesz zjeść siebie");
            return;
        }


        if(member.id === client.user.id) {
            await interaction.reply("Nie możesz zjeść mnie. Jestem tylko skryptem :flushed:");
            return;
        }

        if(member.user.bot) {
            await interaction.reply("Nie możesz zjeść botów. Poza tym nie polecam. Nie smakują one dobrze :flushed:");
            return;
        }


        await interaction.reply({ embeds: [ 
                new MessageEmbed()
                    .setColor("#00b7eb")
                    .setTitle(`${interaction.author.username} je ${member.user.username} 😋`)
                    .setImage(eatGifs[Math.floor(eatGifs.length * Math.random())])
            ]}
        )
    }
}
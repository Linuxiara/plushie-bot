const { MessageEmbed } = require("discord.js");
const categories = require("./-categories.json")
module.exports = {
    name: "help",
    category: "info",
    description: "Pokazuje pomoc",
    options: [
        {
            name: "category",
            description: "Kategoria",
            type: 3,
            required: true,
            choices: Object.entries(categories).map(([name,description]) => ({ name: description, value: name }))
        }
    ],
    async run(client, interaction) {

        
        const cmdCategory = interaction.options.getString("category");

        const message = new MessageEmbed()
            .setTitle("Pomoc")
            .setDescription(categories[cmdCategory])
            .setColor("#840101");
        const commands = client.commands.filter(cmd => cmd.category === cmdCategory);
        commands.forEach(cmd => message.addField(cmd.name, cmd.description));
        

        await interaction.reply({ embeds: [message] });
    }
}
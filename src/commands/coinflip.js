

module.exports = {
    name: "coinflip",
    category: "fun",
    description: "Coinflip but kinga gay",
    async run(client, interaction) {
       await interaction.reply({ files: [Math.round(Math.random()) ? "src/imgs/gaycoins/gaycoin.png" : "src/imgs/gaycoins/gaycoin1.png"] })
    }
}
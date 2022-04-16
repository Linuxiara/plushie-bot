const { Util } = require("discord.js")

const faces = [
    "(*^ω^)",
    "(◕‿◕✿)",
    "(◕ᴥ◕)",
    "ʕ•́ᴥ•̀ʔっ",
    "ʕ￫ᴥ￩ʔっ",
    "TwT",
    "0///0",
    "^.^",
    "OwO",
    "(｡♥‿♥｡)",
    "UwU",
    "ÚwÚ",
    ">///<",
    "≧◉◡◉≦",
    "≧◠ᴥ◠≦",
    ">.<",
    ">w<",
    "^w^",
    "(つ✧ω✧)つ",
    "(/ =ω=)/",
    "~~",
    "^^",
    "(‐＾▽＾‐)"
];


module.exports = {
    name: "uwu",
    category: "fun",
    description: "UwUuje tekst",
    options: [
        {
            name: "text",
            description: "Tekst",
            required: true,
            type: 3
        }
    ],
    async run(client, interaction) {
        const message = Util.cleanContent(interaction.options.getString("text"), interaction.channel)
            .replace(/(?:l|r)/g, "w")
            .replace(/(?:L|R)/g, "W")
            .replace(/n([aeiou])/g, "ny$1")
            .replace(/N([aeiou])|N([AEIOU])/g, "Ny$1")
            .replace(/ove/gi, "uv")
            .replace(/nd(?= |$)/gi, "ndo")
            .replace(/Ł/g, "W")
            .replace(/ł/g, "w")
            .replace(/([!])+/g, ` ${faces[Math.floor(Math.random() * faces.length)]}`)
            .replace(/([.])+/g, ` ${faces[Math.floor(Math.random() * faces.length)]}`)

        await interaction.reply(message);
    }
}
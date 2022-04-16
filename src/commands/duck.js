//const discord = require("discord.js");
const getImgCommand = require("./-getImgCommand");

module.exports = {
    name: "duck",
    category: "getImg",
    description: "Wysyła kaczke",
    requiredImgs: "duck",
    run: getImgCommand("duck", false, "🦆")
}
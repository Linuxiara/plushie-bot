const getImgCommand = require("./-getImgCommand");

module.exports = {
    name: "bread",
    category: "getImg",
    description: "Sending a bread",
    requiredImgs: "Chleb👍🍞",
    run: getImgCommand("Bread", false, "🍞")
}
const getImgCommand = require("./-getImgCommand");

module.exports = {
    name: "bread",
    category: "getImg",
    description: "Sending a bread",
    requiredImgs: "Chlebππ",
    run: getImgCommand("Bread", false, "π")
}
const getImgCommand = require("./-getImgCommand");

module.exports = {
    name: "femboy",
    category: "getImg",
    description: "Wysyła losowe zdjęcia femboya",
    requiredImgs: "femboy",
    run: getImgCommand("femboy", false, "🏳️‍🌈")
}
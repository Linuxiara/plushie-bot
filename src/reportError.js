const { ownerID } = require("./config.json");

module.exports = async(client, err) => {

    const owner = await client.users.fetch(ownerID);
    await owner.send(`**${err.toString()}**\n**Date:** ${new Date()}\n\`\`\`${err.stack}\`\`\``);
}
const { createServer } = require("http");

module.exports = (client, port) => {
    const server = createServer((req, res) => {
        const data = JSON.stringify({
            username: client.user.username,
            discriminator: client.user.discriminator,
            id: client.user.id,
            avatar: client.user.displayAvatarURL(),
            status: client.user.presence.activities[0].name,
            servers: client.guilds.cache.size,
            commands: client.commands.size,
            ping: client.ws.ping,
            uptime: Math.floor(process.uptime() * 1000) / 1000
        });


        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Length", Buffer.byteLength(data));
        res.writeHead(200); 

        res.end(data);
    });
    
    server.listen(port, () => console.log(`The HTTP server was running on port ${port}`));
}

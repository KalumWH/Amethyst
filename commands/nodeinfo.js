const { client } = require('../app.js');
const ms = require('ms');

module.exports.run = async (client, message, args) => {
    let stats = eval('require("util").inspect(client.player.nodes.get("localhost").stats)');
    if (stats === '{}') {
        return message.channel.send('Lavalink seems to be not running');
    }
    return message.channel.send(`\`\`\`js\n${stats}\`\`\``);
}
module.exports.help = {
    name: "nodeinfo"
}
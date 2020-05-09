const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  message.channel.send(`Pinging...`).then(async (m) => {
      m.delete()
      m.channel.send(`\`[HEARTBEAT]\` ${Math.round(client.ws.ping)}ms\n\`[RESPONSE]\` ${m.createdTimestamp - message.createdTimestamp}ms`)
  });
}
module.exports.help = {
  name: "ping"
}

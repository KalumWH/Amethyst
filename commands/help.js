const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
    const commands = client.commands.map(r => r.help.name).join(', ');
    const embed = new MessageEmbed()
        .addFields({ name: "Commands", value: commands })
        .setTimestamp()
    return message.channel.send(embed);

}
module.exports.help = {
    name: "help"
}
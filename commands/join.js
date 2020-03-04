const { MessageEmbed } = require('discord.js');
const { client } = require('../app.js');

module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed().setTimestamp();
    let bot_vc = message.guild.members.cache.get(message.guild.me.id).voice.channel;
    if (!message.member || !message.member.voice.channel) {
        embed.setTitle('Failed')
             .setDescription(`❌ **Please join a voice channel first**`)
        return message.channel.send(embed);
    }
    if (bot_vc && bot_vc.id === message.member.voice.channel.id) {
        embed.setTitle('Failed')
             .setDescription(`❌ **Try summoning me into a different voice channel**`)
        return message.channel.send(embed);
    }
    await client.player.join({
        guild: message.guild.id,
        channel: message.member.voice.channel.id,
        host: client.player.nodes.first().host
    }, { selfdeaf: true });
    embed.setTitle('Success')
         .setDescription(`✅ **${client.user.username} has been connected to the voice channel**`)
    return message.channel.send(embed);
}
module.exports.help = {
    name: "join"
}
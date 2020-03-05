const { MessageEmbed } = require('discord.js');
const { client } = require('../app.js');

module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed().setTimestamp();
    let bot_vc = message.guild.members.cache.get(message.guild.me.id).voice.channel;
    if (!message.member.voice.channel) {
        embed.setDescription(`❌ **Please join a voice channel first**`)
        return message.channel.send(embed);
    }
    if (bot_vc && bot_vc.id === message.member.voice.channel.id) {
        embed.setDescription(`❌ **Try summoning me into a different voice channel**`)
        return message.channel.send(embed);
    }
    let botChannel = message.guild.members.cache.get(message.guild.me.id).voice.channel;
    if (botChannel && botChannel.id !== message.member.voice.channel.id) {
        await client.player.leave(message.guild.id);
        client.player.join({
            guild: message.guild.id,
            channel: message.member.voice.channel.id,
            host: client.player.nodes.first().host
        }, { selfdeaf: true });
    }
    await client.player.join({
        guild: message.guild.id,
        channel: message.member.voice.channel.id,
        host: client.player.nodes.first().host
    }, { selfdeaf: true });
    embed.setDescription(`✅ **${client.user.username} has been connected to the voice channel**`)
    return message.channel.send(embed);
}
module.exports.help = {
    name: "join"
}
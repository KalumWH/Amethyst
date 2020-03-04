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
    try {
        if (bot_vc.id !== message.member.voice.channel.id) {
            embed.setTitle('Failed')
                .setDescription(`❌ ** I\'m not in that voice channel**`)
            return message.channel.send(embed);
        }
        if (bot_vc.id === message.member.voice.channel.id) {
            await client.player.leave(message.guild.id);
            embed.setTitle('Success')
                 .setDescription('✅ **Amethyst has been disconnected from the voice channel**')
            return message.channel.send(embed);
        }
    } catch (e) {
        embed.setTitle('Failed')
                .setDescription(`❌ ** I\'m not in a voice channel**`)
        return message.channel.send(embed);
    }
}
module.exports.help = {
    name: "disconnect"
}
const { MessageEmbed } = require('discord.js');
const { client, queues } = require('../app.js');

module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed().setTimestamp();
    let getQueue = (server) => {
		if(!queues[server]) queues[server] = [];
		return queues[server];
    }
    const queue = getQueue(message.guild.id);
    const player = client.player.get(message.guild.id);
    if (!message.member.voice.channel) {
        embed.setDescription(':x: **Please join a voice channel first**')
        return message.channel.send(embed);
    }
    if (!player) {
        embed.setDescription(':x: **Nothing is playing**')
        return message.channel.send(embed);
    }
    if (!player.paused) {
        embed.setDescription(':x: **The player is not paused**')
        return message.channel.send(embed);
    }
    await player.pause(false);
    embed.setDescription(':white_check_mark: **Resumed playback**')
    return message.channel.send(embed);
}
module.exports.help = {
    name: "resume"
}
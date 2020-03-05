const { MessageEmbed } = require('discord.js');
const { client, queues } = require('../app.js');

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setTimestamp();
    let getQueue = (server) => {
		if(!queues[server]) queues[server] = [];
		return queues[server];
    }
    try {
        if (!message.member.voice.channel.id) {
            embed.setTitle('Failed')
                 .setDescription(':x: **Please join a voice channel first**')
            return message.channel.send(embed);
        }
        if (client.player.get(message.guild.id) && message.member.voice.channel.id !== message.guild.members.cache.get(message.guild.me.id).voice.channel.id) {
            let newEmbed = new MessageEmbed().setTitle('Failed')
                 .setDescription(':x: **You\'re not in the playing voice channel!**')
            return message.channel.send(newEmbed);
        }
        let queue = getQueue(message.guild.id);
        if(!queue || queue.length == 0) {
            embed.setTitle('Failed')
                 .setDescription('**No music is playing**')
            return message.channel.send(embed);
        }
        if (args[0] && isNaN(args[0])) {
            embed.setTitle('Failed')
                 .setDescription(':x: **The amount to skip must be a number**')
            return message.channel.send(embed);
        }
        let howMany = 1;
        if(args[0]) howMany = Math.min(parseInt(args[0]), queue.length);
        queue.splice(0, howMany - 1);
        embed.setTitle('Success')
             .setDescription(`:white_check_mark: **Skipped** \`${howMany}\` **song${howMany > 1 ? 's' : ''}**`)
        message.channel.send(embed);
        client.player.get(message.guild.id).stop();
    } catch (err) {
        message.channel.send(`**Encountered an error** \`\`\`xl\n${err.message}\n\`\`\``);
    }
}
module.exports.help = {
    name: "skip"
}
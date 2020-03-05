const { MessageEmbed } = require('discord.js');
const { client, queues } = require('../app.js');

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setTimestamp();
    let getQueue = (server) => {
		if(!queues[server]) queues[server] = [];
		return queues[server];
    }
    try {
        const player = client.player.get(message.guild.id);
        let queue = getQueue(message.guild.id);
        if(!queue || queue.length == 0) {
            embed.setTitle('Failed')
                 .setDescription('**No music is playing**')
            return message.channel.send(embed);
        }
        if (!args[0]) {
            embed.setTitle(client.user.username)
                 .setDescription(`🔊 **The current volume is** \`${player.state.volume || 100}%\``)
            return message.channel.send(embed);
        }
        if (isNaN(args[0])) {
            embed.setTitle('Failed')
                 .setDescription(':x: **The volume amount must be a number**')
            return message.channel.send(embed);
        }
        const volume = parseInt(args[0]) || 50;
        if (volume < 0) {
            embed.setTitle('Failed')
                 .setDescription(':x: **The volume can\'t be lower than 0**')
            return message.channel.send(embed);
        }
        if (volume > 200) {
            embed.setTitle('Failed')
                 .setDescription(':x: **The volume can\'t be higher than 200**')
            return message.channel.send(embed);    
        }
        player.volume(volume);

        embed.setTitle('Success')
        .setDescription('🔊 **The volume has been set to** \`' + volume + '%\`')
        message.channel.send(embed);
    } catch (err) {
        message.channel.send(`**Encountered an error**\`\`\`xl\n${err.message}\n\`\`\``);
    }
}
module.exports.help = {
    name: "volume"
}
const { MessageEmbed } = require('discord.js');
const { client, queues } = require('../app.js');

module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed().setTimestamp();
    let getQueue = (server) => {
		if(!queues[server]) queues[server] = [];
		return queues[server];
    }
    let getYTLength = (millisec) => {
        var seconds = (millisec / 1000).toFixed(0);
        var minutes = Math.floor(seconds / 60);
        var hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        if (hours != "") {
            return hours + ":" + minutes + ":" + seconds;
        }
        return minutes + ":" + seconds;
    }
    try {
        const player = client.player.get(message.guild.id);
        if(!player) {
            embed.setTitle('Not playing')
                 .setDescription('**No song is currently playing**')
            return message.channel.send(embed)
        }
        const queue = getQueue(message.guild.id);
        let position; let duration;
        if (queue[0].info.isStream) position = '∞';
        else position = getYTLength(player.state.position);
        if (queue[0].info.isStream) duration = '∞ **[**Live**]**';
        else duration = getYTLength(queue[0].info.length);

        embed.setTitle('🎵 Now playing!')
             .addFields({
                 name: "Channel", value: queue[0].info.author, inline: true }, {
                 name: "Title", value: `[${queue[0].info.title}](${queue[0].info.uri})`, inline: true }, {
                 name: "Position", value: `${position}/${duration}`, inline: true
             })
        return message.channel.send(embed);
    } catch (err) {
        return message.channel.send(`**Encountered an error** \`\`\`xl\n${err.message}\n\`\`\``)
    }
}
module.exports.help = {
    name: "np"
}
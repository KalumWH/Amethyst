const { MessageEmbed } = require('discord.js');
const { client, queues } = require('../app.js');

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setTimestamp();
    let getQueue = (server) => {
		if(!queues[server]) queues[server] = [];
		return queues[server];
    }
    let trimString = (str, max = 10) => {
        if (str.length > max) return `${str.substr(0, max)}...`;
        return str;
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
    const queue = getQueue(message.guild.id);
    if(!client.player.get(message.guild.id)) {
        embed.setTitle('Empty')
             .setDescription('No music is being played in this guild')
        return message.channel.send(embed);
    }

    let queueLength = (queue) => {
        let array = [];
        queue.forEach(video => {
            array.push(video.info.length)
        })
        let addition = array.reduce(function(a, b) {
            return a + b;
        }, 0);
        return getYTLength(addition);
    }
    
    const text = queue.map((video, index) => 
        // console.log(`\`${(index + 1)}.\` ${video.info.author} - ${trimString(video.info.title, 25)} [**${getYTLength(video.info.length)}**]`)
        (`\`${(index + 1)}.\` ${video.info.author} - ${trimString(video.info.title, 25)} [**${getYTLength(video.info.length)}**]`))
        // ('\`' + (index + 1) + '.\` ' + video.info.title + ` (**${getYTLength(video.info.length)}**)`))
        .filter((e, i) => i < 10)
        .join('\n');
    embed.setTitle(`${message.guild.name} Queue **[**Total time: ${queueLength(queue)}**]**`)
         .setDescription(`${text}`)
         .setFooter(`Showing ${queue.length >= 10 ? '10' : queue.length} of ${queue.length} songs`)
    return message.channel.send(embed)

}
module.exports.help = {
    name: "queue"
}
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const { client, ksoft, queues } = require('../app.js');

module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setTimestamp().setFooter('Lyrics powered by KSoft.Si');
    if(!client.player.get(message.guild.id)) { // If there is no song playing
        if (!args[0]) {
            embed.setTitle('Incorrect Arguments')
                 .setDescription('Please play a song before running this command, or provide a song name to search lyrics for')
            return message.channel.send(embed);
        }
        await ksoft.endpoints.lyrics.search(args.join(' '))
        .then(l => {
            embed.setTitle(`Lyrics for ${l[0].name} by ${l[0].artist.name}`)
                 .setURL(l[0].url)
                 .setThumbnail(l[0].artwork)
                 .setDescription(l[0].lyrics)
            if (l[0].lyrics.length > 2048) {
                return message.channel.send(`Lyrics too long. Check them out here:\n<${l[0].url}>`)
            }
            return message.channel.send(embed);
        })
        .catch(error => {
            embed.setTitle('Not found')
                 .setDescription('The lyrics for the song you searched were not found.')
            return message.channel.send(embed)
        })
    }
    // If there is a song playing
    let getQueue = (server) => {
		if(!queues[server]) queues[server] = [];
		return queues[server];
    }
    const queue = getQueue(message.guild.id);
    await ksoft.endpoints.lyrics.search(`${queue[0].info.author} - ${queue[0].info.title}`)
    .then(l => {
        console.log(l[0].lyrics.length)
        embed.setTitle(`Lyrics for ${l[0].name} by ${l[0].artist.name}`)
             .setURL(l[0].url)
             .setThumbnail(l[0].artwork)
             .setDescription(l[0].lyrics)
        if (l[0].lyrics.length > 2048) {
            return message.channel.send(`Lyrics too long. Check them out here:\n<${l[0].url}>`)
        }
        return message.channel.send(embed);
    })
    .catch(error => {
        embed.setTitle('Not found')
             .setDescription('The lyrics for the song you searched were not found.')
        return message.channel.send(embed)
    })
    
}
module.exports.help = {
    name: "lyrics"
}
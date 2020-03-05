const { MessageEmbed } = require('discord.js');
const { client, queues } = require('../app.js');

module.exports.run = async (client, message, args) => {
//     let embed = new MessageEmbed().setTimestamp();
//     let getQueue = (server) => {
// 		if(!queues[server]) queues[server] = [];
// 		return queues[server];
//     }
//     let getSong = async (string) => {
// 		return new Promise(async(resolve, rej) => {
// 			try {
//                 const node = client.player.nodes.first();
//                 const params = new URLSearchParams();
//                 params.append("identifier", string);
//                 const res = await axios.get(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, {
//                     headers: {
// 						Authorization: node.password
// 					}
//                 });
// 				resolve(res.data.tracks);
// 			} catch (e) {
// 				resolve(e);
// 			}
// 		});
//     }
//     if (!message.member.voice.channel.id) {
//         embed.setTitle('Failed')
//              .setDescription(':x: **Please join a voice channel first**')
//         return message.channel.send(embed);
//     }
//     if (client.player.get(message.guild.id) && message.member.voice.channel.id !== message.guild.members.cache.get(message.guild.me.id).voice.channel.id) {
//         let newEmbed = new MessageEmbed().setTitle('Failed')
//              .setDescription(':x: **You\'re not in the playing voice channel!**')
//         return message.channel.send(newEmbed);
//     }
//     const queue = getQueue(message.guild.id);
//     if(!client.player.get(message.guild.id)) {
//         embed.setTitle('Empty')
//              .setDescription('No music is being played in this guild')
//         return message.channel.send(embed);
//     }
//     if(!queue || queue.length == 0) {
//         embed.setTitle('Failed')
//              .setDescription('**No music is playing**')
//         return message.channel.send(embed);
//     }
//     if (!args[0]) {
//         embed.setTitle('Invalid argument')
//              .setDescription('**Provide a songs queue number to remove**')
//         return message.channel.send(embed);
//     }
//     if (args[0] && isNaN(args[0])) {
//         embed.setTitle('Failed')
//              .setDescription(':x: **The amount to skip must be a number**')
//         return message.channel.send(embed);
//     }
//     let song = queue[parseInt(args[0]) - 1];
//     if (!song) {
//         embed.setTitle('Failed')
//              .setDescription(`:x: **Queue position** \`${parseInt(args[0])}\` **is empty**`)
//         return message.channel.send(embed);
//     }


//     let removedEmbed = new MessageEmbed()
//         .setTimestamp()
//         .setTitle('Success')
//         .setDescription(`:white_check_mark: **Removed** \`${song.info.author} - ${song.info.title}\` **from the queue**`);
//     return message.channel.send(removedEmbed)

}
module.exports.help = {
    name: "remove"
}